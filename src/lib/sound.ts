let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const playClickSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
};

export const playHoverSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1400, ctx.currentTime);
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.06);
};

export const playOpenSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  // Sci-fi whoosh up
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  osc1.type = 'sine';
  osc2.type = 'triangle';
  osc1.frequency.setValueAtTime(200, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.3);
  osc2.frequency.setValueAtTime(150, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
  osc1.start(ctx.currentTime);
  osc2.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.4);
  osc2.stop(ctx.currentTime + 0.4);
};

export const playCloseSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  // Sci-fi whoosh down
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
};

export const playVideoStartSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  // Power-up / engage sound
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  osc1.type = 'square';
  osc2.type = 'sine';
  osc1.frequency.setValueAtTime(300, ctx.currentTime);
  osc1.frequency.setValueAtTime(400, ctx.currentTime + 0.08);
  osc1.frequency.setValueAtTime(600, ctx.currentTime + 0.16);
  osc1.frequency.setValueAtTime(900, ctx.currentTime + 0.24);
  osc2.frequency.setValueAtTime(600, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
  osc1.start(ctx.currentTime);
  osc2.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.4);
  osc2.stop(ctx.currentTime + 0.4);
};

export const playVideoStopSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'square';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
};

export const playSuccessChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  // Beautiful 3-note chime
  [0, 0.1, 0.2].forEach((delay, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime([523, 659, 784][i], ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.3);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.3);
  });
};

export const playSwooshSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  // White noise swoosh
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.2);
  filter.Q.value = 2;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(ctx.currentTime);
};
