import { ArrowRight } from "lucide-react";
import { PortfolioData } from "../types";

interface AboutProps {
  data: PortfolioData;
}

export default function About({ data }: AboutProps) {
  return (
    <section
      id="about-section"
      className="relative py-[72px] md:py-[120px] bg-brand-bg-dark overflow-hidden"
    >
      <div className="section-shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)] gap-7 lg:gap-24 items-start">
          <div className="min-w-0 flex flex-col items-start" id="about-left-col">
            <div className="section-eyebrow" id="about-eyebrow">
              <span>03 / WHO?</span>
              <div />
            </div>
            <h2 className="section-title" id="about-header">
              WHO?
            </h2>

            <p
              className="font-sans font-light text-brand-text-soft mt-[18px] md:mt-7 text-base md:text-lg leading-[1.7]"
              id="about-bio"
            >
              {data.bioAbout}
            </p>

            <a
              id="about-cta-btn"
              href="#work-section"
              className="group mt-[34px] hidden md:flex items-center gap-3 border border-brand-text-warm/25 hover:border-brand-crimson-bright hover:bg-brand-crimson/15 py-[15px] px-[22px] text-brand-text-warm font-mono text-xs tracking-[0.16em] font-bold uppercase transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              WHAT I'M UP TO
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="min-w-0" id="about-right-col">
            <div className="mb-3 md:mb-[22px] flex items-center justify-between gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-brand-text-warm font-bold flex items-center gap-2.5">
                <span aria-hidden="true">✦</span>
                THINGS I LIKE
              </h3>
              <span className="hidden sm:inline font-mono text-[11px] font-medium tracking-[0.16em] text-brand-text-muted">
                ALWAYS & RIGHT NOW
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5" id="interests-grid">
              {data.interests.map((interest, index) => (
                <div
                  key={`${interest.name}-${index}`}
                  className="interest-card-enter min-w-0 min-h-[84px] sm:min-h-[120px] bg-brand-bg-deepest/45 border border-brand-wine-light/80 p-[22px] flex flex-col justify-between gap-1.5 sm:gap-4 rounded-[2px] transition-all duration-300 hover:-translate-y-1 hover:border-brand-crimson-bright/80"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="font-mono text-[11px] leading-[1.4] font-medium text-brand-crimson-bright tracking-[0.16em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="interest-card-title font-syne text-[15px] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-brand-text-warm" lang="de">
                    {interest.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2.5 sm:mt-3.5 p-[18px] sm:py-5 sm:px-[22px] bg-brand-crimson/[0.14] border border-brand-wine-light">
              <p className="font-mono text-[10px] sm:text-[11px] font-medium text-brand-text-soft uppercase tracking-[0.16em] leading-[1.8]">
                Wenn es neu, spannend oder ein bisschen aufregend klingt, bin ich dabei.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
