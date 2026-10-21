import { useCallback, useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, ImagePlus, Trash2, X } from "lucide-react";
import { PortfolioData } from "../types";

interface WorkProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

type Project = PortfolioData["projects"][number];

// Cover photos from the Figma mockup, used until a project gets its own photo.
const DEFAULT_COVERS: Record<string, string> = {
  "things-ive-made": "/images/projects/projekte-ideen.webp",
  "writing-and-ideas": "/images/projects/texte-gedanken.webp",
  "sport-and-challenges": "/images/projects/sport-herausforderungen.webp",
  "new-things": "/images/projects/immer-dabei.webp",
};

const coverFor = (project: Project) => project.image ?? DEFAULT_COVERS[project.id];

// Titles with a very long word (e.g. HERAUSFORDERUNGEN) get a smaller size.
const hasLongWord = (title: string) => title.split(/\s+/).some((word) => word.length > 12);

const isVowel = (letter: string | undefined) => !!letter && /[aeiouyäöü]/i.test(letter);
const UNBREAKABLE_PAIRS = ["ch", "ck", "ph", "th"];

// Rough German syllable breaks (…VC|CV…, …V|CV…) as soft hyphens, so long words still break
// with a hyphen in browsers that have no German hyphenation dictionary for `hyphens: auto`.
const softHyphenate = (title: string) =>
  title.replace(/\p{L}{11,}/gu, (word) => {
    let result = "";
    for (let i = 0; i < word.length; i++) {
      result += word[i];
      const next = word[i + 1];
      const breaksHere =
        i >= 2 &&
        word.length - i - 1 >= 3 &&
        !isVowel(next) &&
        isVowel(word[i + 2]) &&
        !UNBREAKABLE_PAIRS.includes(`${word[i]}${next}`.toLowerCase());
      if (breaksHere) result += "­";
    }
    return result;
  });

export default function Work({ data, onChange }: WorkProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const count = data.projects.length;
  const total = String(count).padStart(2, "0");
  const openProject = data.projects.find((project) => project.id === openProjectId) ?? null;
  const closeDialog = useCallback(() => setOpenProjectId(null), []);

  useEffect(() => {
    if (activeIndex > count - 1) setActiveIndex(Math.max(0, count - 1));
  }, [activeIndex, count]);

  const focusCard = (index: number) => {
    const next = Math.min(Math.max(index, 0), count - 1);
    setActiveIndex(next);
    const rail = railRef.current;
    const card = rail?.children[next] as HTMLElement | undefined;
    if (rail && card) {
      const left = card.offsetLeft;
      if (left < rail.scrollLeft || left + card.offsetWidth > rail.scrollLeft + rail.clientWidth) {
        rail.scrollTo({ left, behavior: "smooth" });
      }
    }
  };

  // On swipe, the card closest to the left edge becomes the active one.
  const handleRailScroll = () => {
    const rail = railRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth + 1) return;
    const cards = Array.from(rail.children) as HTMLElement[];
    const closest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Infinity },
    );
    setActiveIndex(closest.index);
  };

  const handleRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusCard(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusCard(activeIndex + 1);
    }
  };

  const handleProjectImageChange = (projectId: string, slotIndex: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Bitte wähle eine Bilddatei aus.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result;
      if (typeof image !== "string") {
        alert("Das Bild konnte nicht geladen werden. Bitte versuche es erneut.");
        return;
      }
      onChange({
        ...data,
        projects: data.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                image: slotIndex === 0 ? image : project.image,
                gallery: Array.from({ length: 3 }, (_, index) =>
                  index === 0 ? null : index === slotIndex ? image : project.gallery?.[index] ?? null,
                ),
              }
            : project,
        ),
      });
    };
    reader.onerror = () => {
      alert("Das Bild konnte nicht gelesen werden. Bitte versuche es erneut.");
    };
    reader.readAsDataURL(file);
  };

  const handleProjectImageRemove = (projectId: string, slotIndex: number) => {
    onChange({
      ...data,
      projects: data.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              image: slotIndex === 0 ? undefined : project.image,
              gallery: Array.from({ length: 3 }, (_, index) =>
                index === slotIndex ? null : project.gallery?.[index] ?? null,
              ),
            }
          : project,
      ),
    });
  };

  return (
    <section id="work-section" className="work-section">
      <div className="section-shell">
        <div className="work-header" id="work-header-block">
          <div>
            <div className="section-eyebrow" id="work-eyebrow">
              <span>02 / WHAT?</span>
              <div />
            </div>
            <h2 className="section-title" id="work-title">WHAT?</h2>
          </div>
          <div className="work-header-aside">
            <p id="work-subtitle">Kleine Ideen, große Ziele und alles, was ich gerade ausprobiere.</p>
            <div className="work-arrows">
              <button
                type="button"
                onClick={() => focusCard(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Vorheriges Projekt"
              >
                <ArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => focusCard(activeIndex + 1)}
                disabled={activeIndex >= count - 1}
                aria-label="Nächstes Projekt"
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={railRef}
          className="work-rail"
          role="region"
          aria-label="Projekte. Mit Pfeiltasten oder Wischgeste navigieren."
          tabIndex={0}
          onScroll={handleRailScroll}
          onKeyDown={handleRailKeyDown}
        >
          {data.projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              id={`project-card-${project.id}`}
              className={`work-card${index === activeIndex ? " is-active" : ""}`}
              style={{ animationDelay: `${index * 90}ms` }}
              onClick={() => {
                setActiveIndex(index);
                setOpenProjectId(project.id);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              aria-label={`${project.title} öffnen`}
            >
              {coverFor(project) && <img className="work-card-image" src={coverFor(project)} alt="" loading="lazy" />}
              <span className="work-card-shade" aria-hidden="true" />
              <span className="work-card-top">
                <span>{project.number} / {total}</span>
                <span className="work-card-mark" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </span>
              <span className="work-card-body">
                <span className="work-card-tags">{project.tags.join(" · ")}</span>
                <span className={`work-card-title${hasLongWord(project.title) ? " is-long" : ""}`} lang="de">{softHyphenate(project.title)}</span>
                <span className="work-card-description">{project.description}</span>
                <span className="work-card-cta">
                  ÖFFNEN <ArrowRight aria-hidden="true" />
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="work-rail-footer">
          <div className="work-progress">
            <span className="work-progress-track" aria-hidden="true">
              <span style={{ width: `${count ? ((activeIndex + 1) / count) * 100 : 0}%` }} />
            </span>
            <span aria-live="polite">
              {data.projects[activeIndex]?.number ?? "00"} / {total}
            </span>
          </div>
          <span className="work-hint">ZIEHEN ODER PFEILE NUTZEN</span>
        </div>

        <div className="work-pager" aria-hidden="true">
          {data.projects.map((project, index) => (
            <span key={project.id} className={index === activeIndex ? "is-active" : undefined} />
          ))}
        </div>
      </div>

      {openProject &&
        createPortal(
          <ProjectDialog
            project={openProject}
            total={total}
            onClose={closeDialog}
            onImageChange={handleProjectImageChange}
            onImageRemove={handleProjectImageRemove}
          />,
          document.body,
        )}
    </section>
  );
}

interface ProjectDialogProps {
  project: Project;
  total: string;
  onClose: () => void;
  onImageChange: (projectId: string, slotIndex: number, event: ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (projectId: string, slotIndex: number) => void;
}

function ProjectDialog({ project, total, onClose, onImageChange, onImageRemove }: ProjectDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    // The dialog is portaled outside #root, so making the app inert keeps Tab inside the dialog.
    const appRoot = document.getElementById("root");
    document.body.style.overflow = "hidden";
    if (appRoot) appRoot.inert = true;
    closeRef.current?.focus();
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (appRoot) appRoot.inert = false;
      window.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="work-dialog-backdrop" onClick={onClose}>
      <div
        className="work-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="work-dialog-cover">
          {coverFor(project) && <img src={coverFor(project)} alt={`Foto für ${project.title}`} />}
        </div>
        <div className="work-dialog-content">
          <div className="work-dialog-top">
            <span>{project.number} / {total}</span>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Schließen">
              <X aria-hidden="true" />
            </button>
          </div>
          <span className="work-card-tags">{project.tags.join(" · ")}</span>
          <h3 id="work-dialog-title" className={hasLongWord(project.title) ? "is-long" : undefined} lang="de">{softHyphenate(project.title)}</h3>
          <p>{project.description}</p>

          <span className="work-dialog-label">FOTOS</span>
          <div className="work-dialog-photos">
            {[0, 1, 2].map((slotIndex) => {
              const image = slotIndex === 0 ? project.image : project.gallery?.[slotIndex] ?? null;
              return (
                <div key={slotIndex} className="work-photo-slot">
                  {image ? (
                    <img src={image} alt={`Foto ${slotIndex + 1} für ${project.title}`} />
                  ) : (
                    <span className="work-photo-empty">
                      <ImagePlus aria-hidden="true" />
                      FOTO {String(slotIndex + 1).padStart(2, "0")}
                    </span>
                  )}
                  <div className="work-photo-actions">
                    <label>
                      <ImagePlus aria-hidden="true" />
                      {image ? "Ersetzen" : "Hinzufügen"}
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => onImageChange(project.id, slotIndex, event)}
                      />
                    </label>
                    {image && (
                      <button
                        type="button"
                        aria-label={`Foto ${slotIndex + 1} entfernen`}
                        onClick={() => onImageRemove(project.id, slotIndex)}
                      >
                        <Trash2 aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
