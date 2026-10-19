import { ArrowRight, Sparkles } from "lucide-react";
import { PortfolioData } from "../types";

interface AboutProps {
  data: PortfolioData;
}

export default function About({ data }: AboutProps) {
  return (
    <section
      id="about-section"
      className="relative py-20 md:py-28 bg-brand-bg-dark border-b border-brand-wine-light/35 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex items-center gap-3 mb-12" id="about-eyebrow">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-crimson-bright font-bold">
            03 / WHO?
          </span>
          <div className="h-[1px] w-12 bg-brand-wine-light" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 min-w-0 flex flex-col items-start" id="about-left-col">
            <h2
              className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-[-0.02em] text-brand-text-warm leading-[1.1]"
              id="about-header"
            >
              WHO?
            </h2>

            <p
              className="font-sans font-light text-brand-text-muted mt-6 text-xs sm:text-sm leading-[1.9] max-w-lg"
              id="about-bio"
            >
              {data.bioAbout}
            </p>

            <a
              id="about-cta-btn"
              href="#work-section"
              className="group mt-8 flex items-center gap-2 border border-brand-text-muted/20 hover:border-brand-crimson hover:bg-brand-bg-deep py-3 px-6 text-brand-text-warm font-mono text-[10px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              style={{ borderRadius: "2px" }}
            >
              WHAT I'M UP TO
              <ArrowRight className="w-3.5 h-3.5 text-brand-crimson group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="lg:col-span-6 min-w-0" id="about-right-col">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-text-warm font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-crimson-bright" />
                THINGS I LIKE
              </h3>
              <span className="font-mono text-[9px] text-brand-text-muted">
                ALWAYS & RIGHT NOW
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="interests-grid">
              {data.interests.map((interest, index) => (
                <div
                  key={`${interest.name}-${index}`}
                  className="interest-card-enter min-w-0 min-h-24 bg-brand-bg-deep/40 border border-brand-wine-light/30 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-crimson-bright/70"
                  style={{ borderRadius: "2px", animationDelay: `${index * 100}ms` }}
                >
                  <span className="font-mono text-[9px] text-brand-crimson-bright tracking-widest">
                    0{index + 1}
                  </span>
                  <span className="interest-card-title font-syne text-sm font-bold uppercase tracking-wide text-brand-text-warm mt-4">
                    {interest.name}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-6 p-5 bg-brand-crimson/15 border border-brand-wine-light/40"
              style={{ borderRadius: "2px" }}
            >
              <p className="font-mono text-[9px] text-brand-text-muted uppercase tracking-wider leading-[1.8]">
                Wenn es neu, spannend oder ein bisschen aufregend klingt, bin ich dabei.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
