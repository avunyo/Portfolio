import { useRef, type ChangeEvent } from "react";
import { ArrowDown, ArrowUpRight, ImagePlus } from "lucide-react";
import { PortfolioData } from "../types";

interface HeroProps {
  data: PortfolioData;
  photoUrl: string | null;
  onPhotoUpload: (base64: string) => void;
}

export default function Hero({ data, photoUrl, onPhotoUpload }: HeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Bitte wähle eine Bilddatei aus.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onPhotoUpload(reader.result);
      else alert("Das Bild konnte nicht geladen werden. Bitte versuche es erneut.");
    };
    reader.onerror = () => alert("Das Bild konnte nicht gelesen werden. Bitte versuche es erneut.");
    reader.readAsDataURL(file);
  };

  return (
    <section id="hero-section" className="hero-editorial">
      <div className="hero-editorial-layout container mx-auto px-6 md:px-12 xl:px-20">
        <div className="hero-editorial-copy">
          <div className="hero-editorial-eyebrow">
            <span className="hero-live-dot" />
            <span>SCHÜLERIN · IMMER OFFEN FÜR NEUES</span>
          </div>
          <h1 id="hero-headline" className="hero-editorial-title">
            <span className="hero-title-intro">Hi, my name is</span>
            <span className="hero-title-name">{data.name}<i>.</i></span>
          </h1>
          <p id="hero-bio" className="hero-editorial-bio">{data.bioHero}</p>

          <div className="hero-editorial-actions" id="hero-cta-group">
            <a id="hero-btn-work" href="#work-section" className="hero-primary-link">
              MEINE PROJEKTE <ArrowDown aria-hidden="true" />
            </a>
            <a id="hero-btn-contact" href="#contact-section" className="hero-secondary-link">
              KONTAKT <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <span className="hero-editorial-note">KREATIV · NEUGIERIG · IN BEWEGUNG</span>
        </div>

        <div className="hero-monument-column">
          <button
            type="button"
            id="hero-photo-frame"
            className={`hero-monument${photoUrl ? " has-photo" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            aria-label={photoUrl ? "Foto ersetzen" : "Foto hinzufügen"}
          >
            {photoUrl ? (
              <img id="uploaded-portrait" src={photoUrl} alt={data.name} />
            ) : (
              <span className="hero-photo-placeholder">
                <ImagePlus aria-hidden="true" />
                <span>DEIN FOTO</span>
              </span>
            )}
            <span className="hero-monument-caption">
              {photoUrl ? "FOTO ÄNDERN" : "FOTO HINZUFÜGEN"}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      </div>
    </section>
  );
}
