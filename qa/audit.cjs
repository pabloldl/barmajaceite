// QA local. Usa la instalación de Playwright disponible en el equipo, sin dependencias del sitio.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/xpabl/AppData/Local/ms-playwright-go/1.50.1/package');
const root = path.resolve(__dirname, '..');
const assert = (condition, text) => { if (!condition) throw new Error(text); };
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp', '.svg':'image/svg+xml', '.ttf':'font/ttf' };
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true });
  let server;
  try {
    const assetPage = await browser.newPage();
    const assets = [];
    for (const name of ['cristal-y-luz','sobremesa']) {
      const jpg = path.join(root, 'img', `${name}.jpg`);
      const webp = path.join(root, 'img', `${name}.webp`);
      if (fs.existsSync(jpg)) {
        const data = fs.readFileSync(jpg);
        assert(data[0] === 255 && data[1] === 216, `JPEG inválido: ${name}`);
        const result = await assetPage.evaluate(async data => {
          const image = new Image(); image.src = `data:image/jpeg;base64,${data}`; await image.decode();
          const canvas = document.createElement('canvas'); canvas.width=image.naturalWidth; canvas.height=image.naturalHeight;
          canvas.getContext('2d').drawImage(image,0,0);
          return { width:canvas.width, height:canvas.height, data:canvas.toDataURL('image/webp', .83).split(',')[1] };
        }, data.toString('base64'));
        fs.writeFileSync(webp, Buffer.from(result.data,'base64'));
        assets.push({name, width:result.width, height:result.height, originalBytes:data.length, webpBytes:fs.statSync(webp).size});
      }
    }
    await assetPage.close();
    server = http.createServer((req,res) => {
      const url = new URL(req.url,'http://localhost');
      const file = path.resolve(root, '.'+decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
      if (!file.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
      fs.readFile(file,(error,data)=>{res.writeHead(error?404:200, {'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(error?'Not found':data);});
    });
    await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    const context = await browser.newContext({permissions:['clipboard-read','clipboard-write']});
    const page = await context.newPage();
    const errors=[]; const failures=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400) failures.push(response.url());});
    const layouts=[];
    for (const width of [375,768,1440,1920]) {
      await page.setViewportSize({width,height:1000});
      await page.goto(origin,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      await page.locator('.interlude img').scrollIntoViewIfNeeded();
      await page.locator('.interlude img').evaluate(img=>img.decode());
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
      const result = await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(i=>({src:i.getAttribute('src'),valid:i.complete&&i.naturalWidth>0})),h1:document.querySelectorAll('h1').length,missingTargets:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)}));
      assert(result.scrollWidth<=width,`Desbordamiento en ${width}: ${result.scrollWidth}`);
      assert(result.images.every(i=>i.valid),`Imagen rota en ${width}`);
      assert(result.h1===1 && result.missingTargets.length===0,'Estructura o anclas inválidas');
      await page.screenshot({path:path.join(__dirname,`desktop-${width}.png`),fullPage:true});
      layouts.push(result);
    }
    await page.getByRole('button',{name:'Carnes'}).click();
    assert(await page.locator('.dish-list li:visible').count()===2,'Filtro de carnes');
    await page.getByRole('button',{name:'Pescado y marisco'}).click();
    assert(await page.locator('.dish-list li:visible').count()===4,'Filtro de pescado');
    await page.getByRole('button',{name:'Todo'}).click();
    assert(await page.locator('.dish-list li:visible').count()===6,'Restablecer filtro');
    await page.locator('#copy-phone').click();
    assert(await page.evaluate(()=>navigator.clipboard.readText())==='655 360 519','Copiar teléfono');
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:undefined,configurable:true}));
    await page.locator('#copy-phone').click();
    assert(await page.locator('#copy-fallback').isVisible(),'Copia alternativa');
    assert(await page.locator('#phone-value').inputValue()==='655 360 519','Número alternativo');
    await page.setViewportSize({width:375,height:812});
    await page.goto(origin,{waitUntil:'networkidle'});
    const menu=page.locator('.menu-toggle');
    assert(!await page.locator('#navegacion').isVisible(),'Menú móvil inicialmente cerrado');
    await menu.click();
    assert(await menu.getAttribute('aria-expanded')==='true','Abrir menú');
    await page.keyboard.press('Escape');
    assert(await menu.getAttribute('aria-expanded')==='false','Cerrar con Escape');
    assert(await menu.evaluate(el=>el===document.activeElement),'Restaurar foco');
    await menu.focus();await page.keyboard.press('Enter');
    await page.locator('#navegacion a[href="#carta"]').click();
    assert(await menu.getAttribute('aria-expanded')==='false','Cerrar tras enlace');
    assert(await page.evaluate(()=>document.activeElement.id)==='carta','Foco en destino');
    await page.waitForTimeout(700);
    assert(await page.evaluate(()=>Math.abs(document.querySelector('#carta').getBoundingClientRect().top)<70),'Scroll a carta');
    await menu.click(); await page.locator('.opening h1').click();
    assert(await menu.getAttribute('aria-expanded')==='false','Cerrar al pulsar fuera');
    await page.setViewportSize({width:768,height:1024});
    assert(await page.locator('#navegacion').isVisible(),'Navegación tras redimensionar');
    const links=await page.locator('a').evaluateAll(items=>items.map(a=>a.getAttribute('href')));
    assert(links.filter(x=>x.startsWith('tel:')).every(x=>x==='tel:+34655360519'),'Teléfonos');
    assert(links.filter(x=>x.includes('google.com/maps')).every(x=>decodeURIComponent(x).includes('Calle Jaén 31')),'Dirección Maps');
    await page.getByText('¿Cómo consulto el horario?',{exact:false}).click();
    assert(await page.locator('.visit-questions details').first().getAttribute('open')!==null,'Desplegable');
    await page.emulateMedia({reducedMotion:'reduce'});
    assert(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)==='auto','Movimiento reducido');
    await page.goto(origin);await page.keyboard.press('Tab');
    assert(await page.evaluate(()=>document.activeElement.className)==='skip','Saltar al contenido con teclado');
    const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:812}});
    const fallback=await noJS.newPage();await fallback.goto(origin,{waitUntil:'networkidle'});
    await fallback.locator('.interlude img').scrollIntoViewIfNeeded();
    await fallback.locator('.interlude img').evaluate(img=>img.decode());
    await fallback.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    assert(await fallback.locator('#navegacion').isVisible(),'Navegación sin JS');
    assert(await fallback.locator('.dish-list li:visible').count()===6,'Carta sin JS');
    assert(await fallback.locator('#copy-phone').isHidden(),'No ofrecer copia inactiva sin JS');
    assert(await fallback.locator('.filters').isHidden(),'No ofrecer filtros inactivos sin JS');
    assert(await fallback.locator('img').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0)),'Imágenes sin JS');
    await fallback.screenshot({path:path.join(__dirname,'no-js-375.png'),fullPage:true});
    assert(errors.length===0 && failures.length===0,'Errores de consola o recursos');
    const report={date:'2026-10-27',browser:'Chrome headless / Playwright',assets,layouts,checks:['Filtros: 6/4/2 platos','Copia real al portapapeles y alternativa sin API','Menú móvil: abrir, Escape, foco, enlaces, clic exterior','Cambio móvil/escritorio','Scroll a sección y foco de destino','Teléfonos y enlaces Maps: estructura y dirección','Desplegables','Tab inicial y enlace para saltar contenido','Movimiento reducido','Contenido y navegación sin JavaScript','Imágenes decodificadas, fuentes y recursos HTTP sin errores'],errors,failures,limits:['No se realizan llamadas telefónicas ni se comprueba una ruta real de Google Maps.','No se comprueba la vigencia comercial de la carta ni los horarios.','Open Graph usa imagen relativa; al publicar conviene establecer dominio y URL absoluta.']};
    fs.writeFileSync(path.join(__dirname,'report.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  } finally {await browser.close();if(server) await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
