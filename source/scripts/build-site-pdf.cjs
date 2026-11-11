// Exports the whole portfolio webpage as a multi-page PDF (Devika-Bajaj-Portfolio.pdf).  Usage: npm run site-pdf (after npm run build)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const W = 1280, H = Math.round(1280 * 297 / 210); // A4 proportions at desktop width
(async () => {
  const srv = spawn('npx', ['vite', 'preview', '--port', '4191', '--strictPort'], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 2500));
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: 900 } });
  await p.goto('http://localhost:4191/', { waitUntil: 'networkidle' });
  const total = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += 400) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(90); }
  await p.waitForTimeout(1200);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.addStyleTag({ content: `
    header{position:absolute!important;background:transparent!important;border:0!important}
    #home{min-height:${H}px!important}
    main > section{padding-top:56px!important;padding-bottom:56px!important}
    #work, form, #performances .grid > div:nth-child(4), #journey .mt-16, a[aria-label="Back to top"], #cv a[href="#/cv"], header ul, .lg\\:hidden{display:none!important}
    #contact .grid{grid-template-columns:1fr!important}
    article, li, .glass, figure, #skills .grid > div, #certificates .grid > div, #performances .grid > div, #teaching .grid > div, h2, .eyebrow{break-inside:avoid}
    h2{break-after:avoid}
    .eq-bar{animation:none!important}
    *{transition:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    #home img{filter:none!important}
    main button.btn-primary, main button.btn-ghost, #sound .container-x > div:last-child{display:none!important}
    .blur-\\[70px\\], .blur-\\[2px\\]{filter:none!important;opacity:.35!important}
  `});
  // use the lighter -sm photos so the PDF stays small enough to upload to job portals
  await p.evaluate(async () => {
    const imgs = [...document.images].filter(i => !i.src.includes('/portraits/') && /\/assets\/.*[^m]\.jpg$/.test(i.src) && !i.src.endsWith('-sm.jpg'));
    imgs.forEach(i => { i.loading = 'eager'; i.src = i.src.replace(/\.jpg$/, '-sm.jpg'); });
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  });
  await p.emulateMedia({ media: 'screen' });
  await p.waitForTimeout(500);
  // smart pagination: never let a section start near the bottom of a page or be split if it fits on one page
  await p.evaluate((H) => {
    const secs = [...document.querySelectorAll('main > section')].filter(s => getComputedStyle(s).display !== 'none');
    for (const s of secs) {
      const top = s.getBoundingClientRect().top + window.scrollY, h = s.offsetHeight, pos = top % H;
      if (pos === 0) continue;
      if ((h <= H && pos + h > H) || h > H) s.style.marginTop = (H - pos) + 'px';
    }
    // leave footer at the end of the last page
  }, H);
  const pdf = await p.pdf({ width: W + 'px', height: H + 'px', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
  for (const f of ['public/Devika-Bajaj-Portfolio.pdf', 'dist/Devika-Bajaj-Portfolio.pdf']) fs.writeFileSync(f, pdf);
  await b.close(); srv.kill(); console.log('Portfolio PDF written');
})();
