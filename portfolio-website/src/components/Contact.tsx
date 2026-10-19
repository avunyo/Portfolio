import { Mail, Instagram, Linkedin, Send } from "lucide-react";
import { PortfolioData } from "../types";

interface ContactProps {
  data: PortfolioData;
}

export default function Contact({ data }: ContactProps) {
  // Safe links
  const mailTo = `mailto:${data.email}`;
  const instagramUrl = data.instagram.startsWith("http") 
    ? data.instagram 
    : `https://instagram.com/${data.instagram}`;
  const linkedinUrl = data.linkedin.startsWith("http") 
    ? data.linkedin 
    : `https://linkedin.com/in/${data.linkedin}`;
  const hasContactInfo = Boolean(data.email.trim() || data.instagram.trim() || data.linkedin.trim());

  return (
    <section
      id="contact-section"
      className="relative py-24 md:py-32 bg-brand-bg-deep border-b border-brand-wine-light/35 overflow-hidden text-center flex flex-col justify-center items-center"
    >
      {/* Heavy centered radial crimson glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[550px] rounded-full bg-brand-crimson/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10 max-w-4xl flex flex-col items-center">
        
        {/* Eyebrow Label */}
        <div className="flex items-center gap-3 mb-6 justify-center" id="contact-eyebrow">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-crimson-bright font-bold">
            04 / CONTACT
          </span>
          <div className="h-[1px] w-12 bg-brand-wine-light" />
        </div>

        {/* Large Syne Heading */}
        <h2 
          id="contact-title"
          className="font-syne font-extrabold text-[36px] sm:text-[48px] md:text-[64px] uppercase tracking-[-0.03em] text-brand-text-warm leading-[1.0] select-none"
        >
          LASS UNS REDEN
        </h2>

        {/* Subtitle */}
        <p 
          id="contact-subtitle"
          className="font-sans font-light text-brand-text-muted mt-6 text-xs sm:text-sm leading-[1.8] max-w-xl text-center"
        >
          {hasContactInfo
            ? "Du hast eine Frage, eine Idee oder möchtest einfach Hallo sagen? Schreib mir gern."
            : "Meine Kontaktdaten ergänze ich bald. Schau gern wieder vorbei."}
        </p>

        {/* Three core social channel links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-2xl" id="contact-channels-grid">
          
          {/* Email button */}
          {data.email.trim() && <a
            id="contact-channel-email"
            href={mailTo}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 border border-brand-wine-light/45 bg-brand-bg-dark/85 hover:border-brand-crimson-bright hover:bg-brand-wine-dark/15 tracking-wide text-brand-text-warm cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg"
            style={{ borderRadius: "2px" }}
          >
            <div className="p-3 bg-brand-bg-deep border border-brand-wine-light lg:group-hover:border-brand-crimson transition-colors group-hover:text-brand-crimson-bright mb-3" style={{ borderRadius: "2px" }}>
              <Mail className="w-5 h-5 text-brand-crimson-bright" />
            </div>
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase mb-1">
              E-MAIL
            </span>
            <span className="font-mono text-[10px] text-brand-text-muted truncate max-w-full">
              {data.email}
            </span>
          </a>}

          {/* Instagram button */}
          {data.instagram.trim() && <a
            id="contact-channel-instagram"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 border border-brand-wine-light/45 bg-brand-bg-dark/85 hover:border-brand-crimson-bright hover:bg-brand-wine-dark/15 tracking-wide text-brand-text-warm cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg"
            style={{ borderRadius: "2px" }}
          >
            <div className="p-3 bg-brand-bg-deep border border-brand-wine-light lg:group-hover:border-brand-crimson transition-all group-hover:text-brand-crimson-bright mb-3" style={{ borderRadius: "2px" }}>
              <Instagram className="w-5 h-5 text-brand-crimson-bright" />
            </div>
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase mb-1">
              INSTAGRAM
            </span>
            <span className="font-mono text-[10px] text-brand-text-muted">
              @{data.instagram.split("/").pop()}
            </span>
          </a>}

          {/* LinkedIn button */}
          {data.linkedin.trim() && <a
            id="contact-channel-linkedin"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 border border-brand-wine-light/45 bg-brand-bg-dark/85 hover:border-brand-crimson-bright hover:bg-brand-wine-dark/15 tracking-wide text-brand-text-warm cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg"
            style={{ borderRadius: "2px" }}
          >
            <div className="p-3 bg-brand-bg-deep border border-brand-wine-light lg:group-hover:border-brand-crimson transition-all group-hover:text-brand-crimson-bright mb-3" style={{ borderRadius: "2px" }}>
              <Linkedin className="w-5 h-5 text-brand-crimson-bright" />
            </div>
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase mb-1">
              LINKEDIN
            </span>
            <span className="font-mono text-[10px] text-brand-text-muted">
              /{data.linkedin.split("/").pop()}
            </span>
          </a>}

        </div>

        {/* Secondary fast-ping feedback form or just quick contact trigger */}
        <div className="mt-14 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-brand-text-muted" id="contact-operational-status">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          ICH FREUE MICH, VON DIR ZU HÖREN
        </div>

      </div>
    </section>
  );
}
