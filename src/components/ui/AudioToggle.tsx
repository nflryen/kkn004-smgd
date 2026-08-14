"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kkn_sound_enabled");
    if (saved === "true") setIsEnabled(true);
  }, []);

  const toggleSound = () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    localStorage.setItem("kkn_sound_enabled", String(nextState));

    if (nextState) {
      playSynthChime();
    }
  };

  const playSynthChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      // AudioContext fallback ignored
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#0b1917]/80 backdrop-blur-xl border border-white/15 text-teal-300 hover:text-white hover:bg-white/10 transition-all shadow-xl min-w-[44px] min-h-[44px] flex items-center justify-center group active:scale-95"
      aria-label={isEnabled ? "Matikan Efek Suara" : "Aktifkan Efek Suara"}
      title={isEnabled ? "Efek Suara Aktif" : "Efek Suara Nonaktif"}
    >
      {isEnabled ? (
        <Volume2 className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 text-white/50 group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
