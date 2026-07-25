import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { PortfolioData } from "../types";

interface AboutProps {
  data: PortfolioData;
}

export default function About({ data }: AboutProps) {
  const [animateBars, setAnimateBars] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="relative py-20 md:py-28 bg-brand-bg-dark border-b border-brand-wine-light/35 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center gap-3 mb-12" id="about-eyebrow">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-crimson-bright font-bold">
            01 / BIOGRAPHICAL INDEX
          </span>
          <div className="h-[1px] w-12 bg-brand-wine-light" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Description */}
          <div className="lg:col-span-6 flex flex-col items-start" id="about-left-col">
            <h2 
              className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.02em] text-brand-text-warm leading-[1.1]"
              id="about-header"
            >
              ARCHITECTING VISUAL SYSTEMS
            </h2>
            
            <p 
              className="font-sans font-light text-brand-text-muted mt-6 text-sm sm:text-base leading-relaxed text-justify"
              id="about-bio"
            >
              {data.bioAbout}
            </p>

            <div className="mt-8 pt-6 border-t border-brand-wine-light/50 w-full" id="about-quotes">
              <p className="font-sans italic text-xs leading-relaxed text-brand-text-muted/80 pl-4 border-l border-brand-crimson">
                "Design is not the decoration of a surface. It is the unyielding pursuit of clean layout, balanced geometry, and absolute visual hierarchy."
              </p>
            </div>

            {/* Custom CTA */}
            <a
              id="about-cta-btn"
              href="#services-section"
              className="group mt-8 flex items-center gap-2 border border-brand-text-muted/20 hover:border-brand-crimson hover:bg-brand-bg-deep py-3 px-6 text-brand-text-warm font-mono text-[10px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 hover:-translate-y-0.5 cursor-none"
              style={{ borderRadius: "2px" }}
            >
              DISCOVER METHODOLOGY
              <ArrowRight className="w-3.5 h-3.5 text-brand-crimson group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column Skills Grid (2x3) */}
          <div className="lg:col-span-6" id="about-right-col">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-text-warm font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-crimson-bright" />
                TECHNICAL METRICS
              </h3>
              <span className="font-mono text-[9px] text-brand-text-muted">
                SCROLL ENTRY ACTUATION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6" id="skills-grid">
              {data.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-brand-bg-deep/40 border border-brand-wine-light/30 p-4 transition-colors hover:border-brand-wine-light/80 block"
                  style={{ borderRadius: "2px" }}
                  id={`skill-card-${index}`}
                >
                  <div className="flex justify-between items-baseline mb-2.5">
                    <span className="font-syne text-[11px] font-bold uppercase tracking-wider text-brand-text-warm">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-brand-crimson-bright font-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Progress Bar container */}
                  <div className="h-1 bg-brand-wine-dark w-full overflow-hidden" style={{ borderRadius: "2px" }}>
                    <div
                      className="h-full bg-brand-crimson-bright transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        width: animateBars ? `${skill.level}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Note on Core Focus */}
            <div className="mt-8 p-4 bg-brand-bg-deep/60 border border-brand-wine-light/40" style={{ borderRadius: "2px" }} id="skills-footer-note">
              <p className="font-mono text-[9px] text-brand-text-muted uppercase tracking-wider leading-relaxed">
                SYSTEM CALIBRATION: Optimized for ultra-dense typography layouts, fluid GPU-accelerated interaction rendering, and flawless corporate-to-luxury design pivot states.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
