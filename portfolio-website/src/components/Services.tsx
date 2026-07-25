import { Briefcase } from "lucide-react";
import { PortfolioData } from "../types";

interface ServicesProps {
  data: PortfolioData;
}

export default function Services({ data }: ServicesProps) {
  return (
    <section
      id="services-section"
      className="py-20 md:py-28 bg-brand-bg-dark border-b border-brand-wine-light/35 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header Eyebrow */}
        <div className="flex items-center gap-3 mb-12" id="services-eyebrow">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-crimson-bright font-bold">
            03 / CORE CAPABILITIES
          </span>
          <div className="h-[1px] w-12 bg-brand-wine-light" />
        </div>

        {/* Dense Headline */}
        <div className="mb-14 max-w-2xl" id="services-headline-box">
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.02em] text-brand-text-warm leading-tight">
            ENGINEERING VALUE & EMOTION
          </h2>
          <p className="font-sans font-light text-brand-text-muted mt-4 text-xs sm:text-sm leading-relaxed text-justify">
            Translating core brand values into uncompromising interactive architecture. Unifying deep-seated visual narrative with optimal digital speed.
          </p>
        </div>

        {/* Horizontal List Blocks */}
        <div className="border-t border-brand-wine-light/30" id="services-rows-container">
          {data.services.map((service) => (
            <div
              key={service.id}
              id={`service-row-${service.id}`}
              className="group flex flex-col lg:flex-row lg:items-center justify-between py-10 border-b border-brand-wine-light/30 hover:bg-brand-wine-dark/15 px-4 md:px-8 -mx-4 md:-mx-8 border-l-2 border-l-transparent hover:border-l-brand-crimson-bright transition-all duration-300"
            >
              {/* Left Side: Number + Title */}
              <div className="flex items-start gap-6 lg:w-7/12 mb-4 lg:mb-0">
                <span className="font-mono text-sm font-bold text-brand-crimson-bright mt-1 tracking-wider">
                  [{service.number}]
                </span>
                <div>
                  <h3 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-brand-text-warm group-hover:text-brand-text-warm transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-1 h-1 bg-brand-crimson-bright" style={{ borderRadius: "1px" }} />
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-brand-crimson-bright">
                      ACTIVE METHOD MODULE
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Description */}
              <div className="lg:w-4/12 flex items-center lg:justify-end">
                <p className="font-sans font-light text-xs sm:text-sm text-brand-text-muted leading-relaxed text-justify group-hover:text-brand-text-warm transition-colors duration-300">
                  {service.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Service bottom layout decorative line */}
        <div className="mt-12 flex justify-end" id="services-footer">
          <div className="flex items-center gap-2 text-brand-text-muted/40">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase">SYSTEM CORE OPERATIONAL</span>
          </div>
        </div>

      </div>
    </section>
  );
}
