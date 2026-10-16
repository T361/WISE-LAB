import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'

const ROOT = process.cwd()
const logoBase64 = readFileSync(join(ROOT, 'public/wise-lab-logo.png')).toString('base64')
const igniteBase64 = readFileSync(join(ROOT, 'public/Ignite-06.png')).toString('base64')
const ministryBase64 = readFileSync(join(ROOT, 'public/Ministry-03.png')).toString('base64')

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: linear-gradient(135deg, #FAF5EE 0%, #F1E4D6 60%, #E8D7C3 100%);
      font-family: 'Outfit', sans-serif;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 56px 64px 44px 64px;
    }
    
    /* Subtle background accents */
    .bg-circle-1 {
      position: absolute;
      top: -120px;
      right: -80px;
      width: 520px;
      height: 520px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(227, 132, 112, 0.18) 0%, rgba(227, 132, 112, 0) 70%);
      pointer-events: none;
    }
    .bg-circle-2 {
      position: absolute;
      bottom: -150px;
      left: 100px;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(44, 122, 112, 0.15) 0%, rgba(44, 122, 112, 0) 70%);
      pointer-events: none;
    }

    /* Top Bar */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 10;
    }
    .kicker-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 9999px;
      background: rgba(74, 46, 61, 0.08);
      border: 1px solid rgba(74, 46, 61, 0.15);
      color: #4A2E3D;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .kicker-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #E38470;
    }
    .partners {
      display: flex;
      align-items: center;
      gap: 20px;
      opacity: 0.85;
    }
    .partner-img {
      height: 38px;
      object-fit: contain;
    }

    /* Main Content */
    .hero-content {
      display: flex;
      align-items: center;
      gap: 56px;
      position: relative;
      z-index: 10;
      margin: auto 0;
    }
    .logo-box {
      width: 240px;
      height: 240px;
      background: #FFFFFF;
      border-radius: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 45px -10px rgba(74, 46, 61, 0.12), 0 0 0 1px rgba(74, 46, 61, 0.06);
      flex-shrink: 0;
      padding: 24px;
    }
    .logo-box img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    
    .text-content {
      flex: 1;
    }
    .title {
      font-size: 46px;
      font-weight: 800;
      color: #4A2E3D;
      line-height: 1.12;
      letter-spacing: -0.02em;
    }
    .title-accent {
      color: #2C7A70;
    }
    .tagline {
      font-size: 24px;
      font-weight: 700;
      color: #E38470;
      margin-top: 10px;
      letter-spacing: -0.01em;
    }
    .description {
      font-family: 'Inter', sans-serif;
      font-size: 18px;
      color: #4A2E3D;
      opacity: 0.85;
      margin-top: 10px;
      line-height: 1.45;
      max-width: 620px;
    }

    /* Bottom Bar */
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 10;
      padding-top: 16px;
      border-top: 1px solid rgba(74, 46, 61, 0.12);
    }
    .track-pills {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .track-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: #FFFFFF;
      box-shadow: 0 2px 8px rgba(74, 46, 61, 0.06);
      font-size: 13px;
      font-weight: 600;
      color: #4A2E3D;
    }
    .track-pill.coral {
      border-left: 3px solid #E38470;
    }
    .track-pill.teal {
      border-left: 3px solid #2C7A70;
    }
    .domain {
      font-family: 'Outfit', sans-serif;
      font-size: 17px;
      font-weight: 700;
      color: #4A2E3D;
      letter-spacing: 0.02em;
    }
  </style>
</head>
<body>
  <div class="bg-circle-1"></div>
  <div class="bg-circle-2"></div>

  <div class="top-bar">
    <div class="kicker-pill">
      <div class="kicker-dot"></div>
      National Flagship Platform
    </div>
    <div class="partners">
      <img class="partner-img" src="data:image/png;base64,${ministryBase64}" alt="Ministry of IT & Telecom">
      <img class="partner-img" src="data:image/png;base64,${igniteBase64}" alt="Ignite">
    </div>
  </div>

  <div class="hero-content">
    <div class="logo-box">
      <img src="data:image/png;base64,${logoBase64}" alt="WISE Lab Logo">
    </div>
    <div class="text-content">
      <h1 class="title">Women Innovation & <span class="title-accent">Startup Empowerment</span></h1>
      <div class="tagline">Her idea. Her enterprise.</div>
      <p class="description">Pakistan's national platform advancing women-led startups, entrepreneurs, and micro-enterprises nationwide.</p>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="track-pills">
      <div class="track-pill teal">✦ Incubation</div>
      <div class="track-pill coral">✦ Micro-Entrepreneurship</div>
      <div class="track-pill teal">✦ Mentorship & Investment</div>
    </div>
    <div class="domain">wiselab.org.pk</div>
  </div>
</body>
</html>`

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(html, { waitUntil: 'networkidle' })
  // Settle font rendering
  await page.waitForTimeout(500)
  const outputPath = join(ROOT, 'public/wise-lab-og-card.png')
  await page.screenshot({ path: outputPath, type: 'png' })
  await browser.close()
  console.log(`[og-card] Successfully generated 1200x630 card at: ${outputPath}`)
}

main().catch(console.error)
