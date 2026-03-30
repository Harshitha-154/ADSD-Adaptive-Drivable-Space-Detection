const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

export const playClickSound = () => {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.frequency.setValueAtTime(800, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
  osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
  gain.gain.setValueAtTime(0.15, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.15);
};

export const playHoverSound = () => {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1400, audioContext.currentTime);
  gain.gain.setValueAtTime(0.05, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.08);
};

export const playOpenSound = () => {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.2);
  gain.gain.setValueAtTime(0.12, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.3);
};

export const playCloseSound = () => {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(900, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.15);
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.2);
};
