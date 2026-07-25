import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Github } from "lucide-react";
import { PortfolioData } from "./types";
import { DEFAULT_PORTFOLIO_DATA } from "./data";
import Customizer from "./components/Customizer";
import CustomCursor from "./components/CustomCursor";
import ScrollReveal from "./components/ScrollReveal";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Services from "./components/Services";
import Contact from "./components/Contact";
import AmbientSoundscape from "./components/AmbientSoundscape";

export default function App() {
  // Load initial portfolio configuration
  const [data, setData] = useState<PortfolioData>(() => {
    const cached = localStorage.getItem("crimson_portfolio_state");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {
        console.error("Failed to restore cached portfolio state", err);
      }
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  // Load photo
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem("crimson_portfolio_photo");
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync state to localStorage with quotas protections in case base64 image exceeds limit
  const handleDataChange = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem("crimson_portfolio_state", JSON.stringify(newData));
    } catch (err) {
      console.warn("Storage quota limit reached for metadata", err);
    }
  };

  const handlePhotoUpload = (base64: string) => {
    setPhotoUrl(base64);
    try {
      localStorage.setItem("crimson_portfolio_photo", base64);
    } catch (err) {
      console.warn("Storage quota limit exceeded. Base64 photo too large for localStorage.", err);
      alert("Note: This image files is stored in active memory but could not fit in the browser's persistent localStorage cache. It will work beautifully for this session!");
    }
  };

  const handleReset = () => {
    setData(DEFAULT_PORTFOLIO_DATA);
    setPhotoUrl(null);
    localStorage.removeItem("crimson_portfolio_state");
    localStorage.removeItem("crimson_portfolio_photo");
  };

  // Close mobile navigation menu on click transitions
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div id="crimson-luxury-dossier" className="min-h-screen bg-brand-bg-deep text-[#F5E8E0] relative selection:bg-brand-crimson selection:text-white">
      
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* FIXED NAVIGATION (Solid Cream Board as requested by the uploaded color block concept) */}
      <nav 
        id="navigation-bar"
        className="fixed top-0 left-0 right-0 z-30 bg-[#F5E8E0] border-b border-brand-crimson/25 py-3 select-none transition-all duration-300 shadow-md"
      >
        <div className="container mx-auto px-6 md:px-12 xl:px-20 flex items-center justify-between">
          
          {/* LOGO */}
          <a
            id="nav-logo"
            href="#"
            className="font-syne font-black text-2xl tracking-tight text-[#1A0508] hover:text-brand-crimson transition-colors cursor-none uppercase"
          >
            {data.name.split(" ")[0] || "PORTFOLIO"}
            <span className="text-brand-crimson-bright font-black">.</span>
          </a>

          {/* DESKTOP LINKS */}
          <div 
            id="desktop-nav-links"
            className="hidden md:flex items-center gap-8 font-mono text-[13px] tracking-wider uppercase font-black text-[#1A0508]"
          >
            <a
              href="#about-section"
              className="relative py-1 cursor-none text-[#1A0508] hover:text-brand-crimson transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:bg-brand-crimson after:transition-transform after:duration-300"
            >
              ABOUT / INDEX
            </a>
            <a
              href="#work-section"
              className="relative py-1 cursor-none text-[#1A0508] hover:text-brand-crimson transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:bg-brand-crimson after:transition-transform after:duration-300"
            >
              EXPERIMENTS / WORK
            </a>
            <a
              href="#services-section"
              className="relative py-1 cursor-none text-[#1A0508] hover:text-brand-crimson transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:bg-brand-crimson after:transition-transform after:duration-300"
            >
              CAPABILITIES
            </a>
            <a
              href="#contact-section"
              className="relative py-1 cursor-none text-[#1A0508] hover:text-brand-crimson transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:bg-brand-crimson after:transition-transform after:duration-300"
            >
              CHANNELS
            </a>
          </div>

          {/* RIGHT SIDE INTEGRATIONS (Soundscape + CTA) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Surprise Custom Auditory soundscape */}
            <AmbientSoundscape />

            <a
              id="desktop-nav-cta"
              href="#contact-section"
              className="px-5 py-2.5 bg-[#1A0508] hover:bg-brand-crimson text-[#F5E8E0] hover:text-white font-mono text-xs tracking-widest font-black uppercase cursor-none transition-all duration-300 border border-transparent shadow-sm"
              style={{ borderRadius: "2px" }}
            >
              LET'S TALK
            </a>
          </div>

          {/* HAMBURGER TRIGGER */}
          <div className="flex items-center gap-4 md:hidden">
            {mobileMenuOpen ? null : <AmbientSoundscape />}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-[#1A0508] hover:text-brand-crimson cursor-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE EXPANDED NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="fixed inset-y-0 right-0 w-full bg-brand-bg-dark border-l border-brand-wine-light/35 z-20 flex flex-col pt-24 px-8 pb-12 justify-between animate-fade-in"
        >
          <div className="flex flex-col gap-8 font-syne text-2xl font-bold uppercase tracking-tight text-brand-text-warm">
            <a
              href="#about-section"
              onClick={handleNavLinkClick}
              className="hover:text-brand-crimson-bright transition-colors flex items-center justify-between py-2 border-b border-brand-wine-light/20"
            >
              01 / ABOUT
              <ArrowUpRight className="w-5 h-5 text-brand-crimson-bright" />
            </a>
            <a
              href="#work-section"
              onClick={handleNavLinkClick}
              className="hover:text-brand-crimson-bright transition-colors flex items-center justify-between py-2 border-b border-brand-wine-light/20"
            >
              02 / EXPERIMENTS
              <ArrowUpRight className="w-5 h-5 text-brand-crimson-bright" />
            </a>
            <a
              href="#services-section"
              onClick={handleNavLinkClick}
              className="hover:text-brand-crimson-bright transition-colors flex items-center justify-between py-2 border-b border-brand-wine-light/20"
            >
              03 / CAPABILITIES
              <ArrowUpRight className="w-5 h-5 text-brand-crimson-bright" />
            </a>
            <a
              href="#contact-section"
              onClick={handleNavLinkClick}
              className="hover:text-brand-crimson-bright transition-colors flex items-center justify-between py-2 border-b border-brand-wine-light/20"
            >
              04 / CHANNELS
              <ArrowUpRight className="w-5 h-5 text-brand-crimson-bright" />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <a
              id="mobile-menu-cta"
              href="#contact-section"
              onClick={handleNavLinkClick}
              className="w-full text-center py-4 bg-brand-crimson text-brand-text-warm font-mono text-[10px] tracking-[0.2em] font-bold uppercase"
              style={{ borderRadius: "2px" }}
            >
              COMMISSION ENGAGEMENT
            </a>
            <p className="font-mono text-[8px] text-brand-text-muted text-center uppercase tracking-widest">
              SYSTEM CONSTRAINTS ENABLED // París, FR
            </p>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <main id="primary-viewport">
        
        {/* HERO SECTION */}
        <ScrollReveal id="hero-reveal" delayMs={100}>
          <Hero 
            data={data} 
            photoUrl={photoUrl} 
            onPhotoUpload={handlePhotoUpload} 
          />
        </ScrollReveal>

        {/* ABOUT SECTION */}
        <ScrollReveal id="about-reveal" delayMs={150}>
          <About data={data} />
        </ScrollReveal>

        {/* PROJECTS SECTION */}
        <ScrollReveal id="work-reveal" delayMs={150}>
          <Work data={data} />
        </ScrollReveal>

        {/* SERVICES SECTION */}
        <ScrollReveal id="services-reveal" delayMs={150}>
          <Services data={data} />
        </ScrollReveal>

        {/* CONTACT SECTION */}
        <ScrollReveal id="contact-reveal" delayMs={150}>
          <Contact data={data} />
        </ScrollReveal>

      </main>

      {/* FOOTER */}
      <footer 
        id="editorial-footer"
        className="bg-brand-bg-dark border-t border-brand-wine-light/35 py-12 text-brand-text-muted select-none"
      >
        <div className="container mx-auto px-6 md:px-12 xl:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Copyright metadata */}
          <div className="md:col-span-6 text-center md:text-left" id="footer-cr">
            <p className="font-mono text-[10px] tracking-widest uppercase">
              &copy; {new Date().getFullYear()} {data.name}. ALL RIGHTS RESERVED.
            </p>
            <p className="font-mono text-[8px] text-brand-text-muted/65 uppercase tracking-[0.15em] mt-1">
              HAUTE TECH DESIGN PORTFOLIO RENDERED IN SILICO
            </p>
          </div>

          {/* Right Column Nav Links */}
          <div 
            id="footer-fast-links"
            className="md:col-span-6 flex flex-wrap justify-center md:justify-end gap-6 md:gap-10 font-mono text-[9px] tracking-widest uppercase font-medium"
          >
            <a href="#about-section" className="hover:text-brand-text-warm transition-colors cursor-none">ABOUT</a>
            <a href="#work-section" className="hover:text-brand-text-warm transition-colors cursor-none">WORK</a>
            <a href="#services-section" className="hover:text-brand-text-warm transition-colors cursor-none">CAPABILITIES</a>
            <a href="#contact-section" className="hover:text-brand-text-warm transition-colors cursor-none">CHANNELS</a>
          </div>

        </div>
      </footer>

      {/* Floating Customize Live Playground Sidebar control */}
      <Customizer 
        data={data} 
        onChange={handleDataChange} 
        onReset={handleReset} 
        onPhotoUpload={handlePhotoUpload}
        photoUrl={photoUrl}
      />

    </div>
  );
}
