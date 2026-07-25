import { ArrowUpRight } from "lucide-react";
import { PortfolioData } from "../types";

interface WorkProps {
  data: PortfolioData;
}

export default function Work({ data }: WorkProps) {
  return (
    <section
      id="work-section"
      className="py-20 md:py-28 bg-brand-bg-deep border-b border-brand-wine-light/35 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header Metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4" id="work-header-block">
          <div>
            <div className="flex items-center gap-3 mb-4" id="work-eyebrow">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-crimson-bright font-bold">
                02 / PORTFOLIO ARTIFACTS
              </span>
              <div className="h-[1px] w-12 bg-brand-wine-light" />
            </div>
            <h2 
              className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.02em] text-brand-text-warm leading-none"
              id="work-title"
            >
              SELECTED EXPERIMENTS
            </h2>
          </div>
          <span className="font-mono text-[10px] text-brand-text-muted uppercase tracking-widest max-w-[200px]" id="work-subtitle">
            CUBIC SWEEP INTERACTIVE TRANSITIONS // BRAND ARCHETYPES
          </span>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6" id="projects-bento-grid">
          {data.projects.map((project) => {
            const spanClass = project.isFeatured
              ? "lg:col-span-8 md:col-span-2"
              : "lg:col-span-4 md:col-span-1";

            return (
              <a
                key={project.id}
                href={project.link}
                id={`project-card-${project.id}`}
                className={`group relative overflow-hidden bg-brand-bg-dark border border-brand-wine-light/35 p-8 md:p-10 flex flex-col justify-between aspect-[1.4/1] md:aspect-[1.5/1] xl:aspect-[1.6/1] ${spanClass} cursor-none shadow-lg transition-transform duration-300 hover:-translate-y-1`}
                style={{ borderRadius: "2px" }}
              >
                {/* Full-card solid crimson block swept up from bottom or top on hover */}
                <div
                  className="absolute inset-0 bg-brand-crimson z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-none"
                  style={{ borderRadius: "2px" }}
                />

                {/* Card Header Structure */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono text-[11px] font-bold tracking-widest text-brand-crimson-bright group-hover:text-brand-bg-deep transition-colors duration-500">
                    NO. // {project.number}
                  </span>
                  
                  {/* Arrow Indicator which scales and rotates */}
                  <div className="p-2 border border-brand-wine-light/50 group-hover:border-brand-bg-deep/35 text-brand-text-warm group-hover:text-brand-bg-deep transition-all duration-500 scale-90 group-hover:scale-100 group-hover:rotate-45" style={{ borderRadius: "2px" }}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Footer Content */}
                <div className="relative z-10 mt-12 md:mt-20">
                  
                  {/* Tag capsules */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 border border-brand-wine-light/40 text-brand-text-muted group-hover:text-brand-bg-deep group-hover:border-brand-bg-deep/20 transition-all duration-500"
                        style={{ borderRadius: "2px" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h3 className="font-syne font-extrabold text-lg sm:text-xl lg:text-2xl uppercase tracking-tight text-brand-text-warm group-hover:text-brand-bg-deep transition-colors duration-500">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="font-sans font-light text-xs sm:text-sm text-brand-text-muted mt-2 max-w-xl group-hover:text-brand-bg-deep/85 transition-colors duration-500 leading-relaxed text-justify">
                    {project.description}
                  </p>

                </div>

              </a>
            );
          })}
        </div>

        {/* Outer Grid Footnote decoration */}
        <div className="mt-8 flex justify-between items-center text-brand-text-muted/60" id="work-grid-footer">
          <span className="font-mono text-[8px] tracking-[0.2em]">AUTOLAYOUT MATRIX RENDERER</span>
          <span className="font-mono text-[8px] tracking-[0.2em]">[ SYSTEM COMPLETE ]</span>
        </div>

      </div>
    </section>
  );
}
