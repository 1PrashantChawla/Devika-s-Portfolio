// Prints the #/cv page to a real, text-selectable A4 PDF.  Usage: npm run cv  (needs `npm run build` first)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
(async () => {
  const srv = spawn('npx', ['vite', 'preview', '--port', '4190', '--strictPort'], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 2500));
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('http://localhost:4190/#/cv', { waitUntil: 'networkidle' }).catch(() => {});
  await p.waitForTimeout(800);
  await p.emulateMedia({ media: 'print' });
  const pdf = await p.pdf({ format: 'A4', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 }, pageRanges: '1' });
  for (const f of ['public/Devika-Bajaj-CV.pdf', 'dist/Devika-Bajaj-CV.pdf']) fs.writeFileSync(f, pdf);
  await b.close(); srv.kill();
  console.log('CV PDF written');
})();
