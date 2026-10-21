import { useState, useRef, useEffect } from "react";
import { Volume2 } from "lucide-react";

interface AmbientSoundscapeProps {
  /** "onCream" for the cream nav bar, "onDark" for the dark mobile menu. */
  tone?: "onCream" | "onDark";
}

export default function AmbientSoundscape({ tone = "onCream" }: AmbientSoundscapeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const chimeTimerRef = useRef<number | null>(null);

  const toggleSoundscape = () => {
    if (!isPlaying) {
      startSoundscape();
    } else {
      stopSoundscape();
    }
  };

  const startSoundscape = () => {
    try {
      // Initialize Audio Context lazily on user gesture
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Create a deep cozy warm drone low hum (D2 / 73.42Hz)
      const droneOsc = ctx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(73.42, ctx.currentTime);

      // Lowpass filter to make it deeply organic & premium
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, ctx.currentTime);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.5, ctx.currentTime);

      // Connect drone nodes
      droneOsc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(masterGain);

      droneOsc.start();
      
      droneOscRef.current = droneOsc;
      droneGainRef.current = droneGain;

      // 2. Play beautiful ambient bell drops on random intervals
      const playBell = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
        
        const now = audioCtxRef.current.currentTime;
        const bellOsc = audioCtxRef.current.createOscillator();
        const bellGain = audioCtxRef.current.createGain();
        const delay = audioCtxRef.current.createDelay();
        const delayGain = audioCtxRef.current.createGain();

        // Quintessential minimal high-fashion luxury chord notes (D Major / Pentatonic)
        const notes = [293.66, 329.63, 369.99, 440.00, 554.37, 587.33, 659.25, 739.99, 880.00];
        const randomFreq = notes[Math.floor(Math.random() * notes.length)];

        bellOsc.type = "triangle";
        bellOsc.frequency.setValueAtTime(randomFreq, now);

        // Soft, fast bell attack & long, organic exponential decay
        bellGain.gain.setValueAtTime(0, now);
        bellGain.gain.linearRampToValueAtTime(0.2, now + 0.08);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        // Delay feedback cycle for depth & vastness
        delay.delayTime.setValueAtTime(0.45, now);
        delayGain.gain.setValueAtTime(0.35, now);

        bellOsc.connect(bellGain);
        bellGain.connect(masterGain);

        // Feed to cozy delay echo line
        bellGain.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(masterGain);
        delayGain.connect(delay); // feedback

        bellOsc.start(now);
        bellOsc.stop(now + 4.8);

        // Next bell trigger
        const nextTime = 3000 + Math.random() * 5000;
        chimeTimerRef.current = window.setTimeout(playBell, nextTime);
      };

      // Trigger first bell after 1s
      chimeTimerRef.current = window.setTimeout(playBell, 1000);
      setIsPlaying(true);
    } catch (err) {
      console.warn("Web Audio context failed to trigger: ", err);
    }
  };

  const stopSoundscape = () => {
    if (chimeTimerRef.current) {
      clearTimeout(chimeTimerRef.current);
      chimeTimerRef.current = null;
    }

    try {
      if (droneOscRef.current) {
        droneOscRef.current.stop();
        droneOscRef.current.disconnect();
        droneOscRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch (err) {
      console.error(err);
    }
    
    setIsPlaying(false);
  };

  // Adjust volume dynamically
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume * 0.4, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Clean play state on unmount
  useEffect(() => {
    return () => {
      if (chimeTimerRef.current) clearTimeout(chimeTimerRef.current);
    };
  }, []);

  return (
    <div 
      className={`flex items-center gap-2.5 select-none ${tone === "onCream" ? "text-brand-bg-deep" : "text-brand-text-warm"}`}
      id="soundscape-panel"
    >
      <button
        onClick={toggleSoundscape}
        className="flex items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 hover:text-brand-crimson transition-colors"
        title="Hintergrundklang ein- oder ausschalten"
        id="soundscape-toggle-btn"
      >
        {isPlaying && <Volume2 className="w-3.5 h-3.5 animate-pulse text-brand-crimson-bright" />}
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em]">
          {isPlaying ? "TON AN" : "TON AUS"}
        </span>
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1 animate-fade-in" id="soundscape-volume-container">
          <span className="font-mono text-[10px] opacity-60">LAUT</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-12 h-[2px] bg-brand-wine-dark/20 accent-brand-crimson outline-none cursor-pointer"
            id="soundscape-volume-slider"
          />
        </div>
      )}
    </div>
  );
}
