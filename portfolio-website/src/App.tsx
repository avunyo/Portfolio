import { useState, useEffect } from "react";
import { MotionConfig } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PortfolioData } from "./types";
import { DEFAULT_PORTFOLIO_DATA } from "./data";
import Customizer from "./components/Customizer";
import ScrollReveal from "./components/ScrollReveal";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Contact from "./components/Contact";
import AmbientSoundscape from "./components/AmbientSoundscape";

export default function App() {
  // Load initial portfolio configuration
  const [data, setData] = useState<PortfolioData>(() => {
    const cached = localStorage.getItem("crimson_portfolio_state");
    if (cached) {
      try {
        const savedData = JSON.parse(cached) as Partial<PortfolioData>;
        if (savedData.name === "AURELIA VALOIS") {
          return {
            ...DEFAULT_PORTFOLIO_DATA,
            email: savedData.email === "design@aureliavalois.com" ? DEFAULT_PORTFOLIO_DATA.email : savedData.email ?? DEFAULT_PORTFOLIO_DATA.email,
            instagram: savedData.instagram === "aurelia.valois" ? DEFAULT_PORTFOLIO_DATA.instagram : savedData.instagram ?? DEFAULT_PORTFOLIO_DATA.instagram,
            linkedin: savedData.linkedin === "aurelia-valois" ? DEFAULT_PORTFOLIO_DATA.linkedin : savedData.linkedin ?? DEFAULT_PORTFOLIO_DATA.linkedin,
          };
        }
        if (savedData.name === "Poina") {
          const savedInterests = savedData.interests ?? (savedData as Partial<PortfolioData> & { skills?: PortfolioData["interests"] }).skills;
          return {
            ...DEFAULT_PORTFOLIO_DATA,
            name: "Polina",
            email: savedData.email ?? DEFAULT_PORTFOLIO_DATA.email,
            instagram: savedData.instagram ?? DEFAULT_PORTFOLIO_DATA.instagram,
            linkedin: savedData.linkedin ?? DEFAULT_PORTFOLIO_DATA.linkedin,
            interests: savedInterests?.some((interest) => !["Trying new things", "Sport", "Marathon training", "Making things"].includes(interest.name))
              ? savedInterests
              : DEFAULT_PORTFOLIO_DATA.interests,
          };
        }
        const previousDefaultDescriptions: Record<string, string> = {
          "things-ive-made": "Schulprojekte, kreative Experimente und alles, was ich gern selbst gestalte. Hier zeige ich die Dinge, auf die ich besonders stolz bin.",
          "writing-and-ideas": "Geschichten, Notizen und Ideen, die ich weiterentwickeln möchte. Hier sammle ich, was ich geschrieben habe und was daraus entsteht.",
          "sport-and-challenges": "Ich bin gern aktiv und probiere neue Sportarten aus. Zurzeit trainiere ich für meinen ersten Marathon.",
          "new-things": "Ein neues Spiel, ein neues Hobby oder eine neue Herausforderung? Wenn mich jemand fragt, bin ich wahrscheinlich schon unterwegs.",
        };
        const restoredProjects = savedData.projects?.map((project) => {
          const defaultProject = DEFAULT_PORTFOLIO_DATA.projects.find(({ id }) => id === project.id);
          const previousDescription = previousDefaultDescriptions[project.id];
          return defaultProject && project.description === previousDescription
            ? { ...project, description: defaultProject.description }
            : project;
        });

        return {
          ...DEFAULT_PORTFOLIO_DATA,
          ...savedData,
          bioHero: savedData.bioHero === "Ich probiere gern Neues aus – ob kreative Projekte, eine neue Sportart oder eine spannende Herausforderung. Gerade bereite ich mich auf einen Marathon vor."
            ? DEFAULT_PORTFOLIO_DATA.bioHero
            : savedData.bioHero ?? DEFAULT_PORTFOLIO_DATA.bioHero,
          bioAbout: savedData.bioAbout === "Ich bin für fast alles zu haben: Wenn mich jemand einlädt, etwas Neues auszuprobieren, bin ich meistens sofort dabei. Ich mag Sport, kreative Ideen und alles, bei dem ich etwas lernen kann. Im Moment trainiere ich für einen Marathon – und freue mich schon auf das nächste Abenteuer."
            ? DEFAULT_PORTFOLIO_DATA.bioAbout
            : savedData.bioAbout ?? DEFAULT_PORTFOLIO_DATA.bioAbout,
          projects: restoredProjects ?? savedData.projects ?? DEFAULT_PORTFOLIO_DATA.projects,
        };
      } catch (err) {
        console.error("Failed to restore cached portfolio state", err);
      }
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    let frameId = 0;
    let lastScrollY = window.scrollY;
    const updateProgress = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0);
        // Tuck the nav away while scrolling down, bring it back on any scroll up.
        const delta = window.scrollY - lastScrollY;
        if (Math.abs(delta) > 6) {
          setNavHidden(delta > 0 && window.scrollY > 160);
          lastScrollY = window.scrollY;
        }
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", updateProgress);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Sync state to localStorage with quotas protections in case base64 image exceeds limit
  const handleDataChange = (newData: PortfolioData) => {
    const projectImageChanged = newData.projects.some(
      (project, index) =>
        project.image !== data.projects[index]?.image ||
        project.gallery?.some((image, slotIndex) => image !== data.projects[index]?.gallery?.[slotIndex]),
    );
    setData(newData);
    try {
      localStorage.setItem("crimson_portfolio_state", JSON.stringify(newData));
    } catch (err) {
      console.warn("Storage quota limit reached for metadata", err);
      if (projectImageChanged) {
        alert("Das Projektfoto ist für diese Sitzung verfügbar, konnte aber nicht dauerhaft im Browserspeicher gespeichert werden.");
      }
    }
  };

  const handleReset = () => {
    setData(DEFAULT_PORTFOLIO_DATA);
    localStorage.removeItem("crimson_portfolio_state");
    // Left over from the removed profile photo; cleared so old uploads don't linger in storage.
    localStorage.removeItem("crimson_portfolio_photo");
  };

  // Close mobile navigation menu on click transitions
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div id="crimson-luxury-dossier" className="min-h-screen bg-brand-bg-deepest text-brand-text-warm relative selection:bg-brand-crimson selection:text-white">

      {/* FIXED NAVIGATION (Solid Cream Board as requested by the uploaded color block concept) */}
      <nav
        id="navigation-bar"
        className={`fixed top-0 left-0 right-0 z-30 bg-brand-cream select-none shadow-[0_4px_18px_rgba(0,0,0,0.25)]${navHidden && !mobileMenuOpen ? " is-hidden" : ""}`}
      >
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-crimson/10" aria-hidden="true">
          <div
            className="h-full origin-left bg-brand-crimson-bright transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
        <div className="container mx-auto px-5 md:px-12 xl:px-20 h-[58px] md:h-[72px] flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          
          {/* LOGO */}
          <a
            id="nav-logo"
            href="#"
            className="font-syne font-extrabold text-base md:text-lg tracking-tight text-brand-bg-deep hover:text-brand-crimson transition-colors cursor-pointer whitespace-nowrap"
          >
            Hi, my name is...
          </a>

          {/* DESKTOP LINKS */}
          <div 
            id="desktop-nav-links"
            className="hidden md:flex items-center gap-9 font-mono text-xs tracking-[0.16em] uppercase font-bold text-brand-bg-deep"
          >
            <a
              href="#work-section"
              className="relative py-1 cursor-pointer text-[#1A0508] hover:text-brand-crimson transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:bg-brand-crimson after:transition-transform after:duration-300"
            >
              WHAT?
            </a>
            <a
              href="#about-section"
              className="relative py-1 cursor-pointer text-[#1A0508] hover:text-brand-crimson transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:bg-brand-crimson after:transition-transform after:duration-300"
            >
              WHO?
            </a>
            <a
              href="#contact-section"
              className="relative py-1 cursor-pointer text-[#1A0508] hover:text-brand-crimson transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:bg-brand-crimson after:transition-transform after:duration-300"
            >
              Contact
            </a>
          </div>

          {/* RIGHT SIDE INTEGRATIONS (Soundscape + CTA) */}
          <div className="hidden md:flex items-center justify-end gap-[22px]">
            {/* Surprise Custom Auditory soundscape */}
            <AmbientSoundscape />

            <a
              id="desktop-nav-cta"
              href="#contact-section"
              className="px-[18px] py-3 bg-brand-bg-deep hover:bg-brand-crimson text-brand-text-warm hover:text-white font-mono text-xs tracking-[0.16em] font-bold uppercase cursor-pointer transition-all duration-300 border border-transparent shadow-sm"
              style={{ borderRadius: "2px" }}
            >
              Say hello
            </a>
          </div>

          {/* HAMBURGER TRIGGER */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-bg-deep hover:text-brand-crimson cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
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
              href="#work-section"
              onClick={handleNavLinkClick}
              className="hover:text-brand-crimson-bright transition-colors flex items-center justify-between py-2 border-b border-brand-wine-light/20"
            >
              01 / WHAT?
              <ArrowUpRight className="w-5 h-5 text-brand-crimson-bright" />
            </a>
            <a
              href="#about-section"
              onClick={handleNavLinkClick}
              className="hover:text-brand-crimson-bright transition-colors flex items-center justify-between py-2 border-b border-brand-wine-light/20"
            >
              02 / WHO?
              <ArrowUpRight className="w-5 h-5 text-brand-crimson-bright" />
            </a>
            <a
              href="#contact-section"
              onClick={handleNavLinkClick}
              className="hover:text-brand-crimson-bright transition-colors flex items-center justify-between py-2 border-b border-brand-wine-light/20"
            >
              03 / CONTACT
              <ArrowUpRight className="w-5 h-5 text-brand-crimson-bright" />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <div className="self-center">
              <AmbientSoundscape tone="onDark" />
            </div>
              <a
              id="mobile-menu-cta"
              href="#contact-section"
              onClick={handleNavLinkClick}
              className="w-full text-center py-4 bg-brand-crimson text-brand-text-warm font-mono text-[10px] tracking-[0.2em] font-bold uppercase"
              style={{ borderRadius: "2px" }}
            >
              GET IN TOUCH
            </a>
            <p className="font-mono text-[8px] text-brand-text-muted text-center uppercase tracking-widest">
              Schön, dass du da bist
            </p>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <main id="primary-viewport">
        
        {/* HERO SECTION */}
        <Hero data={data} />

        {/* WHAT? SECTION */}
        <ScrollReveal id="work-reveal" delayMs={150}>
          <Work data={data} onChange={handleDataChange} />
        </ScrollReveal>

        {/* WHO? SECTION */}
        <ScrollReveal id="about-reveal" delayMs={150}>
          <About data={data} />
        </ScrollReveal>

        {/* CONTACT SECTION */}
        <ScrollReveal id="contact-reveal" delayMs={150}>
          <Contact data={data} />
        </ScrollReveal>

      </main>

      {/* FOOTER */}
      <footer 
        id="editorial-footer"
        className="bg-brand-bg-deepest border-t border-brand-line py-8 md:py-11 text-brand-text-muted select-none"
      >
        <div className="section-shell flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
          
          {/* Left Column Copyright metadata */}
          <div id="footer-cr">
            <p className="font-mono text-[10px] md:text-[11px] font-medium tracking-[0.16em] uppercase">
              &copy; {new Date().getFullYear()} {data.name.toUpperCase()}. ALLE RECHTE VORBEHALTEN.
            </p>
            <p className="hidden md:block font-mono text-[11px] font-medium text-brand-text-muted/60 uppercase tracking-[0.16em] mt-1.5">
              EINE KLEINE SAMMLUNG MEINER IDEEN UND PROJEKTE
            </p>
          </div>

          {/* Right Column Nav Links */}
          <div 
            id="footer-fast-links"
            className="order-first md:order-none flex flex-wrap gap-7 md:gap-10 font-mono text-[11px] tracking-[0.16em] uppercase font-medium"
          >
            <a href="#work-section" className="hover:text-brand-text-warm transition-colors cursor-pointer">WHAT?</a>
            <a href="#about-section" className="hover:text-brand-text-warm transition-colors cursor-pointer">WHO?</a>
            <a href="#contact-section" className="hover:text-brand-text-warm transition-colors cursor-pointer">CONTACT</a>
          </div>

        </div>
      </footer>

      {/* Floating Customize Live Playground Sidebar control */}
      <Customizer 
        data={data} 
        onChange={handleDataChange} 
        onReset={handleReset} 
      />

    </div>
    </MotionConfig>
  );
}
