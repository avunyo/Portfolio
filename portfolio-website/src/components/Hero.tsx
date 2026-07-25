import React, { useRef } from "react";
import { Upload, ArrowDown, MapPin } from "lucide-react";
import { PortfolioData } from "../types";
import InteractiveCanvas from "./InteractiveCanvas";

interface HeroProps {
  data: PortfolioData;
  photoUrl: string | null;
  onPhotoUpload: (base64: string) => void;
}

export default function Hero({ data, photoUrl, onPhotoUpload }: HeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onPhotoUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 md:pt-36 pb-12 border-b border-brand-wine-light/35 bg-brand-bg-deep"
    >
      {/* Background drifting grid lines */}
      <div className="absolute inset-0 animate-grid-drift pointer-events-none" />

      {/* Ambient Radial glow behind hero */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-crimson/10 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start" id="hero-text-block">
          
          {/* Eyebrow label */}
          <div className="flex items-center gap-2 mb-6" id="hero-eyebrow">
            <span className="w-1.5 h-1.5 bg-brand-crimson-bright animate-ping" style={{ borderRadius: "2px" }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-text-muted font-medium flex items-center gap-1.5">
              PERSISTENT RECORD // <MapPin className="w-3 h-3 text-brand-crimson-bright inline" /> {data.city}
            </span>
          </div>

          {/* Headline Name */}
          <h1 
            id="hero-headline"
            className="font-syne font-extrabold text-[44px] sm:text-[56px] md:text-[76px] lg:text-[70px] xl:text-[88px] leading-[0.9] text-brand-text-warm tracking-[-0.03em] uppercase select-none"
          >
            {data.name}
            <span className="text-brand-crimson-bright inline-block animate-pulse">.</span>
          </h1>

          {/* Italic Role Line */}
          <p 
            id="hero-role-line"
            className="font-syne italic font-medium text-brand-crimson-bright text-xl sm:text-2xl md:text-3xl mt-4 tracking-[-0.01em]"
          >
            {data.role}
          </p>

          {/* Bio paragraph */}
          <p 
            id="hero-bio"
            className="font-sans font-light text-brand-text-muted mt-6 text-sm sm:text-base leading-relaxed max-w-xl text-justify"
          >
            {data.bioHero}
          </p>

          {/* CTA Buttons row */}
          <div className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto" id="hero-cta-group">
            <a
              id="hero-btn-work"
              href="#work-section"
              className="group relative flex-1 sm:flex-initial text-center bg-brand-crimson hover:bg-brand-crimson-bright text-brand-text-warm font-mono text-[10px] tracking-[0.2em] font-semibold uppercase py-4 px-8 border border-brand-crimson-bright/35 cursor-none transition-all duration-300 hover:-translate-y-[2px] shadow-lg shadow-brand-crimson/15"
              style={{ borderRadius: "2px" }}
            >
              PROJECT ARTIFACTS
            </a>
            <a
              id="hero-btn-contact"
              href="#contact-section"
              className="flex-1 sm:flex-initial text-center bg-transparent hover:bg-brand-wine-dark/20 text-brand-text-warm border border-brand-text-muted/30 hover:border-brand-text-warm font-mono text-[10px] tracking-[0.2em] font-semibold uppercase py-4 px-8 cursor-none transition-all duration-300 hover:-translate-y-[2px]"
              style={{ borderRadius: "2px" }}
            >
              COMMISSION INQUIRY
            </a>
          </div>

        </div>

        {/* Right Column Frame Content */}
        <div className="lg:col-span-5 flex justify-center pb-8 lg:pb-0" id="hero-visual-block">
          <div className="relative w-full max-w-[340px] aspect-[4/5]" id="hero-photo-container">
            
            {/* Offset crimson border line */}
            <div 
              className="absolute inset-0 border border-brand-crimson-bright translate-x-4 translate-y-4 z-0 pointer-events-none"
              style={{ borderRadius: "2px" }}
            />

            {/* Main Interactive Frame card */}
            <div 
              onClick={triggerUpload}
              className="group absolute inset-0 z-10 bg-brand-wine-dark/70 border border-brand-wine-light/50 overflow-hidden cursor-none flex flex-col items-center justify-center transition-all duration-300 hover:border-brand-crimson-bright shadow-2xl"
              style={{ borderRadius: "2px" }}
              id="hero-photo-frame"
            >
              {photoUrl ? (
                <img
                  referrerPolicy="no-referrer"
                  src={photoUrl}
                  alt={data.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  id="uploaded-portrait"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center text-brand-text-muted transition-colors group-hover:text-brand-text-warm">
                  {/* Surprising interactive background mesh */}
                  <InteractiveCanvas />
                  
                  {/* Foreground labels positioned relatively above kinetic canvas */}
                  <div className="relative z-20 flex flex-col items-center pointer-events-none">
                    <svg 
                      className="w-14 h-14 text-brand-crimson-bright mb-4 animate-[pulse_3s_infinite]" 
                      viewBox="0 0 100 100" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 10H90V90H10V10Z" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M10 10L90 90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                      <path d="M90 10L10 90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold text-brand-text-warm bg-brand-bg-deep/85 px-2 py-1 border border-brand-wine-light/50">
                      [ KINETIC VOID CANVAS ]
                    </span>
                    <span className="font-sans font-light text-xs mt-3 max-w-[200px] leading-relaxed text-brand-text-muted bg-brand-bg-deep/80 p-2 border border-brand-wine-light/30">
                      Interact with pointer. Click inside frame to upload photograph.
                    </span>
                    <div className="mt-4 flex items-center gap-1.5 bg-brand-crimson border border-brand-crimson-bright/40 px-3.5 py-2 text-[9px] font-mono uppercase tracking-widest text-brand-text-warm shadow-md">
                      <Upload className="w-3 h-3 text-brand-text-warm" />
                      LOAD PORTRAIT
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay highlight edit tip */}
              {photoUrl && (
                <div className="absolute inset-0 bg-brand-bg-deep/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                  <Upload className="w-6 h-6 text-brand-crimson-bright mb-2" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#F5E8E0]">Replace Photo</span>
                  <span className="text-[10px] text-brand-text-muted mt-1">Accepts local jpg, png assets</span>
                </div>
              )}

              {/* Hidden native input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* FLOATING STATS PANELS - Top Right */}
            <div 
              className="absolute -top-6 -right-12 z-20 bg-brand-bg-deep/90 border border-brand-wine-light px-3.5 py-2 hover:border-brand-crimson-bright crimson-glow transition-colors cursor-none"
              style={{ borderRadius: "2px" }}
              id="hero-stat-years"
            >
              <div className="font-syne font-extrabold text-lg text-brand-text-warm leading-none tracking-tight">
                {data.stats.years}
                <span className="text-brand-crimson-bright text-sm ml-0.5">+</span>
              </div>
              <div className="font-mono text-[8px] uppercase tracking-widest text-brand-text-muted mt-0.5">
                Years Exp
              </div>
            </div>

            {/* FLOATING STATS PANELS - Mid Left */}
            <div 
              className="absolute top-1/2 -left-14 -translate-y-1/2 z-20 bg-brand-bg-deep/90 border border-brand-wine-light px-3.5 py-2 hover:border-brand-crimson-bright crimson-glow transition-colors cursor-none"
              style={{ borderRadius: "2px" }}
              id="hero-stat-projects"
            >
              <div className="font-syne font-extrabold text-lg text-brand-text-warm leading-none tracking-tight">
                {data.stats.projects}
                <span className="text-brand-crimson-bright text-sm ml-0.5">ITEMS</span>
              </div>
              <div className="font-mono text-[8px] uppercase tracking-widest text-brand-text-muted mt-0.5">
                Completed
              </div>
            </div>

            {/* FLOATING STATS PANELS - Bottom Right */}
            <div 
              className="absolute -bottom-4 -right-14 z-20 bg-brand-bg-deep/90 border border-brand-wine-light px-3.5 py-2 hover:border-brand-crimson-bright crimson-glow transition-colors cursor-none"
              style={{ borderRadius: "2px" }}
              id="hero-stat-clients"
            >
              <div className="font-syne font-extrabold text-lg text-brand-text-warm leading-none tracking-tight">
                {data.stats.clients}
                <span className="text-brand-crimson-bright text-sm ml-0.5">CORE</span>
              </div>
              <div className="font-mono text-[8px] uppercase tracking-widest text-brand-text-muted mt-0.5">
                Clients
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Pulsing Scroll Indicator line at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none" id="scroll-pulse">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-brand-text-muted mb-2">SCROLL DOWN</span>
        <div className="w-[1px] h-12 bg-brand-wine-light relative overflow-hidden" style={{ borderRadius: "2px" }}>
          {/* pulsating core line */}
          <div className="absolute top-0 left-0 right-0 w-full bg-brand-crimson-bright h-6 animate-[bounce_2s_infinite] origin-top" />
        </div>
      </div>
    </section>
  );
}
