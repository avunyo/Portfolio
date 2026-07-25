import React, { useState } from "react";
import { Sliders, X, RotateCcw, Check, Upload } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioData } from "../types";

interface CustomizerProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  onReset: () => void;
  onPhotoUpload: (base64: string) => void;
  photoUrl: string | null;
}

export default function Customizer({
  data,
  onChange,
  onReset,
  onPhotoUpload,
  photoUrl,
}: CustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTextChange = (field: keyof PortfolioData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleNestedStatChange = (field: "years" | "projects" | "clients", value: number) => {
    onChange({
      ...data,
      stats: {
        ...data.stats,
        [field]: value,
      },
    });
  };

  const handleSkillLevelChange = (index: number, level: number) => {
    const updatedSkills = [...data.skills];
    updatedSkills[index] = { ...updatedSkills[index], level: Math.max(0, Math.min(100, level)) };
    onChange({
      ...data,
      skills: updatedSkills,
    });
  };

  const handleSkillNameChange = (index: number, name: string) => {
    const updatedSkills = [...data.skills];
    updatedSkills[index] = { ...updatedSkills[index], name };
    onChange({
      ...data,
      skills: updatedSkills,
    });
  };

  // Handle Photo file reading
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

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="toggle-customizer-btn"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-brand-crimson hover:bg-brand-crimson-bright text-brand-text-warm font-mono text-xs tracking-widest uppercase px-5 py-3 border border-brand-crimson-bright/40 shadow-2xl cursor-none transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        style={{ borderRadius: "2px" }}
      >
        <Sliders className="w-4 h-4" />
        Customize App
      </button>

      {/* Slide-out Customizer Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="customizer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-bg-deep z-45"
            />

            {/* Sidebar drawer */}
            <motion.div
              id="customizer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-bg-dark border-l border-brand-wine-light/50 text-brand-text-warm z-50 overflow-y-auto px-6 py-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-wine-light/45 pb-4 mb-6">
                <div>
                  <h3 className="font-syne text-xl font-bold tracking-tight text-brand-text-warm uppercase">
                    Personalize Website
                  </h3>
                  <p className="font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mt-1">
                    Live client-side playground
                  </p>
                </div>
                <button
                  id="close-customizer-btn"
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-brand-crimson-bright transition-colors cursor-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="space-y-6 text-sm">
                
                {/* Reset Section */}
                <div className="flex gap-2">
                  <button
                    id="reset-customizer-btn"
                    onClick={onReset}
                    className="w-full flex items-center justify-center gap-2 border border-brand-wine-light hover:border-brand-crimson font-mono text-[10px] tracking-[0.15em] uppercase py-2 bg-brand-bg-deep/50 hover:bg-brand-wine-dark/30 transition-colors cursor-none"
                    style={{ borderRadius: "2px" }}
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset to Aurelia's Defaults
                  </button>
                </div>

                {/* Profile Image upload box */}
                <div>
                  <label className="block font-mono text-[10px] text-brand-text-muted tracking-[0.15em] uppercase mb-2">
                    Profile Photography
                  </label>
                  <div 
                    className="border border-dashed border-brand-wine-light p-4 text-center cursor-none bg-brand-bg-deep/40 hover:border-brand-crimson-bright transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    {photoUrl ? (
                      <div className="mb-3 relative w-16 h-16 mx-auto border border-brand-crimson">
                        <img 
                          referrerPolicy="no-referrer"
                          src={photoUrl} 
                          alt="preview" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-brand-bg-deep/40 flex items-center justify-center font-mono text-[8px] uppercase">
                          Loaded
                        </div>
                      </div>
                    ) : (
                      <Upload className="w-6 h-6 mx-auto text-brand-text-muted mb-2" />
                    )}
                    <label className="cursor-none text-brand-crimson-bright hover:text-brand-text-warm font-mono text-[11px] uppercase tracking-wider block">
                      Choose Photography File
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </label>
                    <span className="text-[10px] text-brand-text-muted/65 block mt-1">
                      Local JPG / PNG. Reads locally in browser.
                    </span>
                  </div>
                </div>

                {/* Field Header */}
                <div className="border-t border-brand-wine-light/35 pt-4">
                  <h4 className="font-mono text-[11px] tracking-[0.2em] text-brand-crimson-bright uppercase mb-3 font-semibold">
                    Identity Parameters
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => handleTextChange("name", e.target.value)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-3 py-2 text-brand-text-warm focus:outline-none focus:border-brand-crimson transition-colors font-syne uppercase"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mb-1">
                        Professional Role
                      </label>
                      <input
                        type="text"
                        value={data.role}
                        onChange={(e) => handleTextChange("role", e.target.value)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-3 py-2 text-brand-text-warm focus:outline-none focus:border-brand-crimson transition-colors italic"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={data.city}
                        onChange={(e) => handleTextChange("city", e.target.value)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-3 py-2 text-brand-text-warm focus:outline-none focus:border-brand-crimson transition-colors"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Summaries */}
                <div className="border-t border-brand-wine-light/35 pt-4">
                  <h4 className="font-mono text-[11px] tracking-[0.2em] text-brand-crimson-bright uppercase mb-3 font-semibold">
                    Narrative Text Blocks
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mb-1">
                        Hero Tagline Statement
                      </label>
                      <textarea
                        rows={3}
                        value={data.bioHero}
                        onChange={(e) => handleTextChange("bioHero", e.target.value)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-3 py-2 text-brand-text-warm text-xs focus:outline-none focus:border-brand-crimson transition-colors"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mb-1">
                        About Story Details
                      </label>
                      <textarea
                        rows={4}
                        value={data.bioAbout}
                        onChange={(e) => handleTextChange("bioAbout", e.target.value)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-3 py-2 text-brand-text-warm text-xs focus:outline-none focus:border-brand-crimson transition-colors"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="border-t border-brand-wine-light/35 pt-4">
                  <h4 className="font-mono text-[11px] tracking-[0.2em] text-brand-crimson-bright uppercase mb-3 font-semibold">
                    Metric Quantities
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-mono text-[9px] text-brand-text-muted tracking-wider uppercase mb-1">
                        Years Exp
                      </label>
                      <input
                        type="number"
                        value={data.stats.years}
                        onChange={(e) => handleNestedStatChange("years", parseInt(e.target.value) || 0)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-2 py-1.5 text-brand-text-warm text-center focus:outline-none focus:border-brand-crimson transition-colors font-mono"
                        style={{ borderRadius: "2px" }}
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] text-brand-text-muted tracking-wider uppercase mb-1">
                        Projects
                      </label>
                      <input
                        type="number"
                        value={data.stats.projects}
                        onChange={(e) => handleNestedStatChange("projects", parseInt(e.target.value) || 0)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-2 py-1.5 text-brand-text-warm text-center focus:outline-none focus:border-brand-crimson transition-colors font-mono"
                        style={{ borderRadius: "2px" }}
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] text-brand-text-muted tracking-wider uppercase mb-1">
                        Core Clients
                      </label>
                      <input
                        type="number"
                        value={data.stats.clients}
                        onChange={(e) => handleNestedStatChange("clients", parseInt(e.target.value) || 0)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-2 py-1.5 text-brand-text-warm text-center focus:outline-none focus:border-brand-crimson transition-colors font-mono"
                        style={{ borderRadius: "2px" }}
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="border-t border-brand-wine-light/35 pt-4">
                  <h4 className="font-mono text-[11px] tracking-[0.2em] text-brand-crimson-bright uppercase mb-3 font-semibold">
                    Skills Metrics (Right Column of About)
                  </h4>
                  <div className="space-y-3">
                    {data.skills.map((skill, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-7">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleSkillNameChange(index, e.target.value)}
                            className="w-full bg-brand-bg-deep border border-brand-wine-light px-2 py-1 text-xs text-brand-text-warm focus:outline-none focus:border-brand-crimson transition-colors"
                            style={{ borderRadius: "2px" }}
                          />
                        </div>
                        <div className="col-span-5 flex items-center gap-1.5">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => handleSkillLevelChange(index, parseInt(e.target.value))}
                            className="w-full accent-brand-crimson cursor-none"
                          />
                          <span className="font-mono text-[10px] w-8 text-right text-brand-text-muted">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div className="border-t border-brand-wine-light/35 pt-4">
                  <h4 className="font-mono text-[11px] tracking-[0.2em] text-brand-crimson-bright uppercase mb-3 font-semibold">
                    Editorial Channels
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => handleTextChange("email", e.target.value)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-3 py-2 text-brand-text-warm text-xs focus:outline-none focus:border-brand-crimson transition-colors"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mb-1">
                        Instagram Username
                      </label>
                      <input
                        type="text"
                        value={data.instagram}
                        onChange={(e) => handleTextChange("instagram", e.target.value)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-3 py-2 text-brand-text-warm text-xs focus:outline-none focus:border-brand-crimson transition-colors"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-brand-text-muted tracking-wider uppercase mb-1">
                        LinkedIn Slug
                      </label>
                      <input
                        type="text"
                        value={data.linkedin}
                        onChange={(e) => handleTextChange("linkedin", e.target.value)}
                        className="w-full bg-brand-bg-deep border border-brand-wine-light px-3 py-2 text-brand-text-warm text-xs focus:outline-none focus:border-brand-crimson transition-colors"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Note Banner */}
                <div className="bg-brand-wine-dark/45 border border-brand-wine-light/50 p-3 mt-6">
                  <p className="font-mono text-[9px] text-brand-text-muted leading-relaxed">
                    Custom properties are persisted locally in <b>localStorage</b> so your customized portfolio renders immediately on refresh or if you copy/share the site.
                  </p>
                </div>

                <button
                  id="apply-customizer-btn"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-brand-crimson hover:bg-brand-crimson-bright border border-brand-crimson-bright/40 font-mono text-xs uppercase tracking-widest py-3 text-brand-text-warm cursor-none shadow-lg transition-transform hover:-translate-y-0.5"
                  style={{ borderRadius: "2px" }}
                >
                  Apply & Close Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
