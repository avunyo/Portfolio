import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ArrowLeft, ArrowRight, ImagePlus, Trash2 } from "lucide-react";
import { PortfolioData } from "../types";

interface WorkProps {
  data: PortfolioData;
  photoUrl: string | null;
  onChange: (newData: PortfolioData) => void;
}

export default function Work({ data, photoUrl, onChange }: WorkProps) {
  const [rotationStep, setRotationStep] = useState(0);
  const [flippedProjectId, setFlippedProjectId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const suppressClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelDeltaRef = useRef(0);
  const wheelFlushTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelConsumedRef = useRef(false);
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const selectedIndex = data.projects.length ? ((rotationStep % data.projects.length) + data.projects.length) % data.projects.length : 0;
  const selectedProject = data.projects[selectedIndex];

  const stepCards = (direction: -1 | 1) => {
    if (!data.projects.length) return;
    setRotationStep((step) => step + direction);
    setFlippedProjectId(null);
    setIsSpinning(true);
    if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    spinTimeoutRef.current = setTimeout(() => setIsSpinning(false), 1100);
  };

  useEffect(() => {
    const stage = trackRef.current;
    if (!stage || data.projects.length < 2) return;

    const spinBy = (steps: number) => {
      if (!steps) return;
      setRotationStep((step) => step + steps);
      setFlippedProjectId(null);
      setIsSpinning(true);
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = setTimeout(() => setIsSpinning(false), 1100);
    };

    const handleWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 2) return;
      event.preventDefault();

      if (wheelConsumedRef.current) {
        if (wheelFlushTimeoutRef.current) clearTimeout(wheelFlushTimeoutRef.current);
        wheelFlushTimeoutRef.current = setTimeout(() => {
          wheelConsumedRef.current = false;
          wheelDeltaRef.current = 0;
        }, 280);
        return;
      }

      wheelDeltaRef.current += delta;
      if (Math.abs(wheelDeltaRef.current) >= 45) {
        spinBy(wheelDeltaRef.current > 0 ? 1 : -1);
        wheelDeltaRef.current = 0;
        wheelConsumedRef.current = true;
      }

      if (wheelFlushTimeoutRef.current) clearTimeout(wheelFlushTimeoutRef.current);
      wheelFlushTimeoutRef.current = setTimeout(() => {
        wheelConsumedRef.current = false;
        wheelDeltaRef.current = 0;
      }, 120);
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", handleWheel);
      if (wheelFlushTimeoutRef.current) clearTimeout(wheelFlushTimeoutRef.current);
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, [data.projects.length]);

  useEffect(() => () => {
    if (suppressClickTimerRef.current) clearTimeout(suppressClickTimerRef.current);
  }, []);

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
    <section
      id="work-section"
      className="py-20 md:py-28 bg-brand-bg-deep border-b border-brand-wine-light/35 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-5" id="work-header-block">
          <div>
            <div className="flex items-center gap-3 mb-4" id="work-eyebrow">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-crimson-bright font-bold">
                02 / WHAT?
              </span>
              <div className="h-[1px] w-12 bg-brand-wine-light" />
            </div>
            <h2
              className="font-syne font-extrabold text-5xl sm:text-6xl md:text-7xl uppercase tracking-[-0.065em] text-brand-text-warm leading-[0.88]"
              id="work-title"
            >
              WHAT?
            </h2>
          </div>
          <div className="flex items-end justify-between md:justify-end gap-5">
            <span className="font-sans font-light text-xs leading-relaxed text-brand-text-muted max-w-[220px]" id="work-subtitle">
              Kleine Ideen, große Ziele und alles, was ich gerade ausprobiere.
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => stepCards(-1)}
                aria-label="Previous project"
                className="p-2.5 sm:p-3 border border-brand-wine-light/50 text-brand-text-warm hover:border-brand-crimson-bright hover:text-brand-crimson-bright hover:bg-brand-crimson/15 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => stepCards(1)}
                aria-label="Next project"
                className="p-2.5 sm:p-3 border border-brand-wine-light/50 text-brand-text-warm hover:border-brand-crimson-bright hover:text-brand-crimson-bright hover:bg-brand-crimson/15 transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className={`project-showcase grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch${flippedProjectId ? " has-open-project-card" : ""}`}>
          <div className={`lg:col-span-5 min-w-0${flippedProjectId ? " project-work-column is-card-expanded" : ""}`}>
            <div
              ref={trackRef}
              role="region"
              className={`project-track project-carousel-stage${isSpinning ? " is-spinning" : ""}${flippedProjectId ? " has-open-card" : ""}`}
              aria-label="Projektkarussell. Mit Mausrad, Pfeiltasten oder Wischgeste navigieren."
              onClickCapture={(event) => {
                if (!suppressClickRef.current) return;
                suppressClickRef.current = false;
                if (suppressClickTimerRef.current) clearTimeout(suppressClickTimerRef.current);
                event.preventDefault();
                event.stopPropagation();
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") stepCards(-1);
                if (event.key === "ArrowRight") stepCards(1);
                if (event.key === "Escape") setFlippedProjectId(null);
              }}
              onPointerDown={(event) => {
                if (event.pointerType === "touch") {
                  touchStartRef.current = { x: event.clientX, y: event.clientY };
                }
              }}
              onPointerUp={(event) => {
                const start = touchStartRef.current;
                touchStartRef.current = null;
                if (!start || event.pointerType !== "touch") return;
                const deltaX = event.clientX - start.x;
                const deltaY = event.clientY - start.y;
                if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
                  event.preventDefault();
                  suppressClickRef.current = true;
                  if (suppressClickTimerRef.current) clearTimeout(suppressClickTimerRef.current);
                  suppressClickTimerRef.current = setTimeout(() => {
                    suppressClickRef.current = false;
                  }, 350);
                  stepCards(deltaX < 0 ? 1 : -1);
                }
              }}
              onPointerCancel={() => {
                touchStartRef.current = null;
              }}
              tabIndex={0}
            >
              {data.projects.map((project, index) => {
                const count = data.projects.length;
                const isSelected = index === selectedIndex;
                const isFlipped = project.id === flippedProjectId && isSelected;
                let offset = count ? (index - selectedIndex + count) % count : 0;
                if (offset > count / 2) offset -= count;
                const distance = Math.abs(offset);
                const isVisible = distance <= 1;

                return (
                  <div
                    key={project.id}
                    id={`project-card-${project.id}`}
                    className="project-card-scene"
                    data-active={isSelected}
                    aria-hidden={!isVisible}
                    inert={!isVisible}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${offset * 70}%) rotateY(${-offset * 24}deg) translateZ(${-distance * 70}px) scale(${1 - distance * 0.16})`,
                      opacity: isSelected ? 1 : isVisible ? 0.56 : 0,
                      visibility: isVisible ? "visible" : "hidden",
                      filter: distance ? "blur(1.2px)" : "none",
                      zIndex: count - distance,
                    }}
                  >
                    <div className={`project-card-flipper${isFlipped ? " is-flipped" : ""}`}>
                      <div className="project-card-face project-card-front" aria-hidden={isFlipped}>
                        <span className="project-card-sweep" aria-hidden="true" />
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          aria-label={`${project.title}: open card`}
                          disabled={isFlipped}
                          onClick={() => {
                            if (!isSelected) {
                              stepCards(offset > 0 ? 1 : -1);
                              return;
                            }
                            setFlippedProjectId(project.id);
                          }}
                          className={`project-card-front-button project-card-cover group ${isSelected ? "is-selected" : ""}${project.image ? " has-cover-image" : ""}`}
                          style={{ borderRadius: "8px" }}
                        >
                          {project.image && (
                            <img
                              src={project.image}
                              alt=""
                              aria-hidden="true"
                              className="project-card-cover-image"
                            />
                          )}
                          <span className="project-card-cover-topline">
                            <span>{project.number} / {String(data.projects.length).padStart(2, "0")}</span>
                            <ArrowRight className="project-card-open-arrow w-4 h-4" aria-hidden="true" />
                          </span>
                          <span className="project-card-cover-copy">
                            <span className="project-card-cover-title">
                              {project.title}
                            </span>
                            <span className="project-card-cover-tags">
                              {project.tags.join(" · ")}
                            </span>
                            <span className="project-card-cover-bottom">
                              <span>ÖFFNEN</span>
                              <span aria-hidden="true">↗</span>
                            </span>
                          </span>
                        </button>
                      </div>
                      <div
                        className="project-card-face project-card-back"
                        style={{ borderRadius: "8px" }}
                        aria-hidden={!isFlipped}
                        onClick={(event) => {
                          if ((event.target as HTMLElement).closest("label, button, input")) return;
                          setFlippedProjectId(null);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") setFlippedProjectId(null);
                        }}
                      >
                        {project.image ? (
                          <>
                            <img
                              src={project.image}
                              alt={`Foto für ${project.title}`}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-deep via-brand-bg-deep/70 to-brand-bg-deep/20" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-brand-bg-dark" />
                        )}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="font-mono text-[10px] tracking-widest text-brand-text-warm">
                            {project.number} / PHOTO DECK
                          </span>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-brand-text-warm/75">
                            CLICK TO FLIP BACK
                          </span>
                        </div>
                        <div className="project-photo-deck relative z-10">
                          <div className="project-photo-stack" aria-label={`Photo templates for ${project.title}`}>
                            {[0, 1, 2].map((slotIndex) => {
                              const galleryImage = project.gallery?.[slotIndex] ?? (slotIndex === 0 ? project.image : null);
                              return (
                                <div
                                  key={slotIndex}
                                  className={`project-photo-slot project-photo-slot-${slotIndex + 1}`}
                                  style={{ zIndex: slotIndex + 1 }}
                                >
                                  {galleryImage ? (
                                    <img src={galleryImage} alt={`Photo ${slotIndex + 1} for ${project.title}`} />
                                  ) : (
                                    <div className="project-photo-placeholder">
                                      <ImagePlus aria-hidden="true" />
                                      <span>PHOTO {String(slotIndex + 1).padStart(2, "0")}</span>
                                    </div>
                                  )}
                                  <div className="project-photo-actions">
                                    <label className="project-photo-upload" data-no-drag>
                                      <ImagePlus className="w-3 h-3" />
                                      {galleryImage ? "Replace" : "Add photo"}
                                      <input
                                        type="file"
                                        accept="image/*"
                                        disabled={!isFlipped}
                                        onChange={(event) => handleProjectImageChange(project.id, slotIndex, event)}
                                        className="sr-only"
                                      />
                                    </label>
                                    {galleryImage && (
                                      <button
                                        type="button"
                                        aria-label={`Remove photo ${slotIndex + 1}`}
                                        data-no-drag
                                        disabled={!isFlipped}
                                        onClick={() => handleProjectImageRemove(project.id, slotIndex)}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <h3 className="mt-3 font-syne font-extrabold text-lg uppercase tracking-tight text-brand-text-warm break-words">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="font-mono text-[8px] text-brand-text-muted/75 uppercase tracking-[0.16em]">
                WISCHEN ODER SCROLLEN
              </p>
              <p className="font-mono text-[9px] text-brand-crimson-bright tracking-[0.18em]" aria-live="polite">
                {selectedProject?.number ?? "00"} <span className="text-brand-text-muted/60">/ {String(data.projects.length).padStart(2, "0")}</span>
              </p>
            </div>
          </div>

          <div
            className="lg:col-span-7 project-feature relative min-w-0 min-h-[380px] md:min-h-[480px] overflow-hidden border border-brand-wine-light/40 bg-brand-bg-dark"
            style={{ borderRadius: "8px" }}
            aria-live="polite"
          >
            {selectedProject && (
              <div key={selectedProject.id} className="project-detail-enter absolute inset-0">
                {selectedProject.image || photoUrl ? (
                  <img
                    src={selectedProject.image ?? photoUrl ?? undefined}
                    alt={selectedProject.image ? `Foto für ${selectedProject.title}` : `${data.name} portfolio photo`}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(168,34,58,0.38),transparent_45%),linear-gradient(135deg,#2D0A10_0%,#1A0508_75%)]" />
                )}
                <div className="project-feature-grain absolute inset-0" />
                <div className={`project-artwork project-artwork-${selectedIndex + 1}${selectedProject.image || photoUrl ? " has-photo" : ""}`} aria-hidden="true">
                  <div className="project-art-orbit project-art-orbit-a" />
                  <div className="project-art-orbit project-art-orbit-b" />
                  <div className="project-art-object">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="project-art-floor" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-deep via-brand-bg-deep/50 to-brand-bg-deep/5" />
                <div className="absolute top-7 right-7 font-syne font-extrabold text-[120px] md:text-[190px] leading-none text-brand-text-warm/[0.08] select-none">
                  {selectedProject.number}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
                  <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-brand-crimson-bright">
                    SELECTED STORY <span className="text-brand-text-muted/60">/ {selectedProject.number}</span>
                  </span>
                  <h3 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.045em] text-brand-text-warm mt-3 max-w-2xl leading-[0.95]">
                    {selectedProject.title}
                  </h3>
                  <p className="font-sans font-light text-[11px] sm:text-xs text-brand-text-muted leading-[1.8] mt-4 max-w-md break-words hyphens-auto">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="border border-brand-text-warm/20 bg-brand-bg-deep/35 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-brand-text-warm/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center text-brand-text-muted/60" id="work-grid-footer">
          <span className="font-mono text-[8px] tracking-[0.2em]">MIT NEUGIER GEMACHT</span>
          <span className="font-mono text-[8px] tracking-[0.2em]">ES KOMMT NOCH MEHR</span>
        </div>
      </div>
    </section>
  );
}
