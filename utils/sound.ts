let audioCtx: AudioContext | null = null;

const getAudioCtx = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContext();
  }
  return audioCtx;
};

export const playClickSound = () => {
  const ctx = getAudioCtx();
  if (!ctx) return;

  try {
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log("Audio failed", e);
    }
  }
};

export const playFooterLinkSound = () => {
  const ctx = getAudioCtx();
  if (!ctx) return;

  if (process.env.NODE_ENV === "development") {
    console.log("Footer sound triggered");
  }

  try {
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "square"; // More mechanical click
    oscillator.frequency.setValueAtTime(600, ctx.currentTime); 
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime); // Louder
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.15);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log("Audio failed", e);
    }
  }
};
