import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PortfolioData } from "../types";

interface HeroProps {
  data: PortfolioData;
}

// Abstract head-and-shoulders figure: an oval head, a short neck and a wide dome
// that runs to the bottom edge of the first screen.
const FIGURE_HEAD = "M 200 48 C 248 48 276 86 276 134 C 276 184 244 216 200 216 C 156 216 124 184 124 134 C 124 86 152 48 200 48 Z";
const FIGURE_NECK = "M 176 208 L 172 262 M 224 208 L 228 262";
const FIGURE_BODY = "M 6 620 C 18 410 96 268 200 262 C 304 268 382 410 394 620";

export default function Hero({ data }: HeroProps) {
  const nameLetters = Array.from(data.name);

  return (
    <section id="hero-section" className="hero-stage">
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-stage-layout">
        <div className="hero-copy-column">
          <div className="hero-copy">
            <div className="hero-eyebrow hero-fade-in" style={{ animationDelay: "100ms" }}>
              <span className="hero-live-dot" />
              <span>SCHÜLERIN · IMMER OFFEN FÜR NEUES</span>
            </div>

            <h1 id="hero-headline" className="hero-title" aria-label={`Hi, my name is ${data.name}.`}>
              <span className="hero-title-intro hero-fade-in" style={{ animationDelay: "200ms" }} aria-hidden="true">
                Hi, my name is
              </span>
              <span className="hero-title-name" aria-hidden="true">
                {nameLetters.map((letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    className="hero-letter"
                    style={{ animationDelay: `${320 + index * 55}ms` }}
                  >
                    {letter === " " ? " " : letter}
                  </span>
                ))}
                <i className="hero-letter" style={{ animationDelay: `${320 + nameLetters.length * 55}ms` }}>.</i>
              </span>
              <span
                className="hero-title-rule"
                style={{ animationDelay: `${520 + nameLetters.length * 55}ms` }}
                aria-hidden="true"
              />
            </h1>

            <p id="hero-bio" className="hero-bio hero-fade-in" style={{ animationDelay: "650ms" }}>
              {data.bioHero}
            </p>

            <div className="hero-actions hero-fade-in" id="hero-cta-group" style={{ animationDelay: "780ms" }}>
              <a id="hero-btn-work" href="#work-section" className="hero-primary-link">
                MEINE PROJEKTE <ArrowDown aria-hidden="true" />
              </a>
              <a id="hero-btn-contact" href="#contact-section" className="hero-secondary-link">
                KONTAKT <ArrowUpRight aria-hidden="true" />
              </a>
            </div>

            <span className="hero-note hero-fade-in" style={{ animationDelay: "900ms" }}>
              KREATIV · NEUGIERIG · IN BEWEGUNG
            </span>
          </div>
        </div>
      </div>

      <div className="hero-figure" aria-hidden="true">
        <span className="hero-figure-glow" />
        <svg className="hero-figure-svg" viewBox="0 0 400 620" preserveAspectRatio="xMidYMax meet">
          <defs>
            {/* userSpaceOnUse: one gradient across the whole figure (light head, crimson shoulders), as in the mockup. */}
            <linearGradient id="hero-figure-stroke" x1="200" y1="40" x2="200" y2="620" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F3DDD3" />
              <stop offset="45%" stopColor="#E5536B" />
              <stop offset="100%" stopColor="#9A2236" />
            </linearGradient>
            <linearGradient id="hero-figure-fill" x1="200" y1="40" x2="200" y2="620" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E5536B" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1F0A10" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="hero-figure-float">
            <path className="hero-figure-echo" d={FIGURE_BODY} pathLength={1} />
            <path className="hero-figure-fill" d={`${FIGURE_BODY} Z`} />
            <path className="hero-figure-fill" d={FIGURE_HEAD} />
            <path className="hero-figure-line" d={FIGURE_BODY} pathLength={1} />
            <path className="hero-figure-line hero-figure-line-neck" d={FIGURE_NECK} pathLength={1} />
            <path className="hero-figure-line hero-figure-line-head" d={FIGURE_HEAD} pathLength={1} />
          </g>
        </svg>
      </div>

      <a href="#work-section" className="hero-scroll-hint" aria-label="Nach unten scrollen">
        <span aria-hidden="true" />
        SCROLL
      </a>
    </section>
  );
}
