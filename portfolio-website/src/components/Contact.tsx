import { Mail, Instagram, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

  // Channels without a value stay visible as "kommt bald" placeholders, as in the mockup.
  const channels: { id: string; label: string; icon: LucideIcon; href: string | null; value: string }[] = [
    { id: "email", label: "E-MAIL", icon: Mail, href: data.email.trim() ? mailTo : null, value: data.email },
    {
      id: "instagram",
      label: "INSTAGRAM",
      icon: Instagram,
      href: data.instagram.trim() ? instagramUrl : null,
      value: `@${data.instagram.split("/").filter(Boolean).pop()}`,
    },
    {
      id: "linkedin",
      label: "LINKEDIN",
      icon: Linkedin,
      href: data.linkedin.trim() ? linkedinUrl : null,
      value: `/${data.linkedin.split("/").filter(Boolean).pop()}`,
    },
  ];

  return (
    <section
      id="contact-section"
      className="relative py-20 md:py-[140px] bg-brand-bg-deep overflow-hidden text-center flex flex-col justify-center items-center"
    >
      {/* Soft crimson glow rising from the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[900px] max-w-[160vw] h-[600px] rounded-full bg-brand-crimson/20 blur-[140px] pointer-events-none" />

      <div className="section-shell relative z-10 w-full flex flex-col items-center">
        <div className="section-eyebrow justify-center" id="contact-eyebrow">
          <span>04 / CONTACT</span>
          <div />
        </div>

        <h2
          id="contact-title"
          className="section-title contact-title text-center select-none"
        >
          LASS UNS<br className="md:hidden" /> REDEN
        </h2>

        <p
          id="contact-subtitle"
          className="font-sans font-light text-brand-text-soft mt-4 md:mt-[26px] text-[15px] md:text-lg leading-[1.7] max-w-[520px] text-center"
        >
          {hasContactInfo
            ? "Du hast eine Frage, eine Idee oder möchtest einfach Hallo sagen? Schreib mir gern."
            : "Meine Kontaktdaten ergänze ich bald. Schau gern wieder vorbei."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 mt-8 sm:mt-[52px] w-full max-w-[728px]" id="contact-channels-grid">
          {channels.map(({ id, label, icon: Icon, href, value }) => {
            const content = (
              <>
                <span className="p-[11px] bg-brand-bg-deepest border border-brand-wine-light transition-colors group-hover:border-brand-crimson-bright">
                  <Icon className="w-5 h-5 text-brand-crimson-bright" />
                </span>
                <span className="font-syne text-[13px] font-extrabold tracking-[-0.01em] uppercase">
                  {label}
                </span>
                <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-brand-text-muted truncate max-w-full">
                  {href ? value : "kommt bald"}
                </span>
              </>
            );
            const cardClass = "group flex min-h-[160px] flex-col items-center justify-center gap-2.5 py-7 px-5 border border-brand-wine-light/90 bg-brand-bg-dark/85 text-brand-text-warm rounded-[2px]";

            return href ? (
              <a
                key={id}
                id={`contact-channel-${id}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-brand-crimson-bright`}
              >
                {content}
              </a>
            ) : (
              <div key={id} id={`contact-channel-${id}`} className={cardClass} aria-label={`${label}: kommt bald`}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-[30px] sm:mt-[52px] inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] text-brand-text-muted" id="contact-operational-status">
          <span className="w-1.5 h-1.5 bg-brand-crimson-bright rounded-full animate-pulse" />
          ICH FREUE MICH, VON DIR ZU HÖREN
        </div>

      </div>
    </section>
  );
}
