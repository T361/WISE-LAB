import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

/**
 * Bespoke hero section for WISE Lab.
 *
 * Features:
 * – Atmospheric glow orbs (teal / purple / coral)
 * – Gradient headline "HER IDEA. HER [TYPED WORD]"
 * – Typed.js dynamic typewriter effect for:
 *   'ENTERPRISE.', 'STARTUP.', 'LEGACY.', 'EMPIRE.'
 * – Handwritten marker/script typography matching brand design
 * – Animated neon-border CTA button (Apply Now)
 * – Partner logos strip (MoITT + Ignite)
 * – PM portrait showcase card with caption
 */

const styles = `
/* ============================================================
   PMBanner – Bespoke Hero
   ============================================================ */

/* ---- Color tokens (scoped to .bespoke-hero) ---- */
.bespoke-hero {
  --color-teal: #2C7A70;
  --color-purple: #4A2E3D;
  --color-coral: #E38470;
  --color-plum: #4A2E3D;
  --color-bg-dark: #120a21;
  --color-white: #ffffff;
}

/* ---- Section ---- */
.bespoke-hero {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  min-height: 100svh;
  display: flex;
  align-items: center;
  isolation: isolate;
}

/* ---- Glow Orbs ---- */
.hero-glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
}
.glow-teal {
  width: 600px;
  height: 600px;
  background: rgba(44, 122, 112, 0.08);
  top: -15%;
  left: -10%;
  animation: orb-drift-teal 12s ease-in-out infinite alternate;
}
.glow-purple {
  width: 500px;
  height: 500px;
  background: rgba(74, 46, 61, 0.06);
  top: 30%;
  right: -5%;
  animation: orb-drift-purple 14s ease-in-out infinite alternate;
}
.glow-coral {
  width: 450px;
  height: 450px;
  background: rgba(227, 132, 112, 0.08);
  bottom: -10%;
  left: 30%;
  animation: orb-drift-coral 16s ease-in-out infinite alternate;
}

@keyframes orb-drift-teal {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(60px, 40px) scale(1.12); }
}
@keyframes orb-drift-purple {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-50px, 30px) scale(1.08); }
}
@keyframes orb-drift-coral {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, -30px) scale(1.15); }
}

/* ---- Background noise ---- */
.hero-background-noise {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.04;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ---- Grid container ---- */
.hero-grid-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  padding-top: 6rem;
  padding-bottom: 4rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 1024px) {
  .hero-grid-container {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

/* ---- Left column ---- */
.hero-left-col {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* ---- Typography layer ---- */
.hero-typography-layer {
  display: flex;
  flex-direction: column;
}

.hero-title-bespoke {
  font-family: 'Outfit', 'Inter', system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0;
}

.hero-title-line {
  display: block;
  margin-bottom: 0.15em;
}

/* ---- Gradient text ---- */
.text-coral-gradient {
  background: linear-gradient(135deg, #FF8A65 0%, #FFE8D6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-teal-gradient {
  background: linear-gradient(135deg, #2E8C8A 0%, #246f6e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-purple-accent {
  color: #4A2E3D;
}

/* ---- Typed.js typewriter headline ---- */
.hero-title-line.line-2 {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  column-gap: 0.22em;
  row-gap: 0.05em;
}

.hero-typed-wrapper {
  display: inline-flex;
  align-items: baseline;
  position: relative;
  vertical-align: baseline;
  min-height: 1.15em;
  white-space: nowrap;
}

.hero-typed-text {
  font-family: 'Caveat', 'Kalam', 'Patrick Hand', cursive;
  font-weight: 700;
  font-size: 0.85em;
  line-height: 1;
  color: #6C1D7A;
  letter-spacing: 0.01em;
  white-space: nowrap;
  display: inline-block;
  vertical-align: baseline;
}

/* Typed.js blinking cursor matching purple handwritten accent */
.typed-cursor {
  color: #6C1D7A;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 300;
  font-size: 0.82em;
  margin-left: 2px;
  vertical-align: baseline;
  opacity: 1;
  animation: typedjsBlink 0.7s infinite;
}

@keyframes typedjsBlink {
  50% { opacity: 0; }
}

/* ---- Foreground block (mission + CTA + logos) ---- */
.hero-foreground {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ---- Mission editorial ---- */
.hero-mission-editorial {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-left: 2px solid var(--color-teal);
  padding-left: 1rem;
}

.eyebrow-small {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-teal);
}

.mission-text {
  font-family: 'Inter', system-ui, sans-serif;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 480px;
  margin: 0;
}

/* ---- CTA group ---- */
.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

/* ---- Animated border CTA ---- */
@property --angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0deg;
}

.gs-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 2px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  z-index: 1;
  background: rgba(0, 0, 0, 0.05);
}

.gs-container::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300%;
  aspect-ratio: 1 / 1;
  background: conic-gradient(
    from var(--angle),
    transparent 0%,
    transparent 75%,
    var(--color-teal) 95%,
    var(--color-white) 100%
  );
  animation: rotate-border 2.5s linear infinite;
  z-index: -1;
}

.gs-content {
  background: #FF8A65;
  border-radius: 98px;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  z-index: 2;
  width: 100%;
  height: 100%;
  transition: background 0.3s ease;
}

.gs-container:hover .gs-content {
  background: #e67c5b;
}

@keyframes rotate-border {
  from { --angle: 0deg; }
  to { --angle: 360deg; }
}

/* ---- Partner logos strip ---- */
.hero-partner-logos-strip {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

.partner-strip-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(0, 0, 0, 0.6);
}

.partner-logos-row {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-top: 0.5rem;
}

.partner-logo-img {
  height: 75px;
  width: auto;
  object-fit: contain;
  filter: none;
  opacity: 0.85;
  transition: opacity 0.3s ease;
}

.partner-logo-img:hover {
  opacity: 1;
}

.logo-divider {
  width: 1.5px;
  height: 65px;
  background: rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

/* ---- Right column ---- */
.hero-right-col {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
}

.hero-object-layer {
  width: 100%;
  max-width: 490px;
}

@media (min-width: 1024px) {
  .hero-object-layer {
    margin-top: -5rem;
    margin-right: -3rem;
  }
}

.hero-visual-showcase {
  width: 100%;
  position: relative;
}

/* ---- PM showcase frame (White canvas card) ---- */
.hero-pm-showcase-frame {
  position: relative;
  border-radius: 2.25rem;
  overflow: visible;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow:
    0 25px 65px -15px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.02);
  padding: 2.5rem 1.75rem 3.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 1023px) {
  .hero-pm-showcase-frame {
    padding: 2rem 1.25rem 3rem 1.25rem;
  }
}

.hero-pm-image-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-pm-portrait {
  width: 100%;
  max-width: 375px;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

/* ---- Floating PM caption card ---- */
.hero-pm-caption-editorial {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2.5rem);
  max-width: 430px;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.15rem;
  background: #ffffff;
  border: 1.5px solid rgba(44, 122, 112, 0.35);
  border-radius: 14px;
  box-shadow: 0 12px 30px -6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.caption-badge-pk {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 0.04em;
  padding-right: 0.85rem;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
  line-height: 1;
}

.caption-text {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.72rem;
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
}

/* ---- Mobile stacking tweaks ---- */
@media (max-width: 1023px) {
  .hero-grid-container {
    text-align: center;
  }

  .hero-left-col {
    align-items: center;
  }

  .hero-mission-editorial {
    align-items: center;
  }

  .mission-text {
    text-align: center;
  }

  .hero-cta-group {
    justify-content: center;
  }

  .hero-partner-logos-strip {
    align-items: center;
  }

  .hero-object-layer {
    max-width: 400px;
    margin: 0 auto;
  }

  .hero-title-bespoke {
    font-size: clamp(2.4rem, 10vw, 3.6rem);
  }
}

/* ---- Entrance animations ---- */
.hero-title-line {
  animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero-title-line.line-1 {
  animation-delay: 0.15s;
}

.hero-title-line.line-2 {
  animation-delay: 0.35s;
}

.hero-foreground {
  animation: slide-up-fade 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
}

.hero-pm-showcase-frame {
  animation: slide-up-fade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
}

@keyframes slide-up-fade {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .hero-glow-orb,
  .hero-title-line,
  .hero-foreground,
  .hero-pm-showcase-frame {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .gs-container::before {
    animation: none !important;
  }
}

`;

export function PMBanner() {
  const typedEl = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedEl.current) return

    const typed = new Typed(typedEl.current, {
      strings: ['FUTURE.', 'ENTERPRISE.', 'STARTUP.', 'LEGACY.', 'EMPIRE.'],
      typeSpeed: 90,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      cursorChar: '|',
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <section className="bespoke-hero">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {/* Atmospheric glow orbs */}
      <div className="hero-glow-orb glow-teal" />
      <div className="hero-glow-orb glow-purple" />
      <div className="hero-glow-orb glow-coral" />
      <div className="hero-background-noise" />

      <div className="hero-grid-container container">
        {/* ---- Left column: Typography + CTA ---- */}
        <div className="hero-left-col">
          <div className="hero-typography-layer">
            <h1 className="hero-title-bespoke">
              <div className="hero-title-line line-1">
                <span className="text-coral-gradient">HER IDEA.</span>
              </div>
              <div className="hero-title-line line-2">
                <span className="text-teal-gradient">HER </span>
                <span className="hero-typed-wrapper">
                  <span ref={typedEl} className="hero-typed-text" />
                </span>
              </div>
            </h1>
          </div>

          <div className="hero-foreground">
            {/* Mission statement */}
            <div className="hero-mission-editorial">
              <span className="eyebrow-small">THE MISSION</span>
              <p className="mission-text">
                Pakistan's premier physical incubation center designed
                exclusively for women building high-growth startups and
                sustainable MSMEs.
              </p>
            </div>

            {/* CTA */}
            <div className="hero-cta-group">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new Event('open-apply-modal'));
                }}
                className="gs-container"
              >
                <div className="gs-content">
                  <span>Apply Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Partner logos */}
            <div className="hero-partner-logos-strip">
              <span className="partner-strip-label">
                FUNDED &amp; SUPPORTED BY
              </span>
              <div className="partner-logos-row">
                <img
                  alt="Ministry of IT &amp; Telecom"
                  className="partner-logo-img logo-moitt"
                  src="/partners/moitt.png"
                />
                <span className="logo-divider" />
                <img
                  alt="Ignite National Technology Fund"
                  className="partner-logo-img logo-ignite"
                  src="/partners/ignite.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---- Right column: PM showcase ---- */}
        <div className="hero-right-col">
          <div className="hero-object-layer">
            <div className="hero-visual-showcase">
              <div className="hero-pm-showcase-frame">
                <div className="hero-pm-image-wrapper">
                  <img
                    alt="Prime Minister"
                    className="hero-pm-portrait"
                    src="/images/pm picture.png"
                  />
                </div>
                <div className="hero-pm-caption-editorial">
                  <span className="caption-badge-pk">PK</span>
                  <p className="caption-text">
                    Under the vision of the Honorable Prime Minister of
                    Pakistan, WISE Lab is funded under the Ministry of IT &amp;
                    Telecom and Ignite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
