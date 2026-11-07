// Web Audio API Festive Sound Synthesizer Engine
// Zero external audio dependencies - 100% reliable, zero latency, runs offline

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7; // 0 to 1
  private bgmGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: any = null;

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        muted ? 0 : this.volume,
        this.ctx.currentTime
      );
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  private getDestination(): AudioNode | null {
    const ctx = this.initCtx();
    if (!ctx) return null;
    return this.masterGain || ctx.destination;
  }

  // 3D Gift Box shake & ribbon untie
  public playGiftBoxOpen() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;

    // 1. Gentle magical shimmer whoosh
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 0.65);

    // 2. Sparkle burst chime
    const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    freqs.forEach((f, idx) => {
      const sOsc = ctx.createOscillator();
      const sGain = ctx.createGain();
      const delay = 0.2 + idx * 0.05;

      sOsc.type = "triangle";
      sOsc.frequency.setValueAtTime(f, now + delay);

      sGain.gain.setValueAtTime(0.001, now + delay);
      sGain.gain.linearRampToValueAtTime(0.18, now + delay + 0.03);
      sGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.8);

      sOsc.connect(sGain);
      sGain.connect(dest);
      sOsc.start(now + delay);
      sOsc.stop(now + delay + 0.85);
    });
  }

  // Diya lighting singing bowl chime
  public playDiyaLight() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(528, now); // 528 Hz love frequency
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1056, now);
    osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.25);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(dest);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.7);
    osc2.stop(now + 1.7);
  }

  // Wax seal crack & paper unfold
  public playWaxSealBreak() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;

    // 1. Crack click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.06);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 0.08);

    // 2. Paper rustle noise
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(900, now + 0.06);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, now + 0.06);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(dest);

    noise.start(now + 0.06);
    noise.stop(now + 0.45);
  }

  // Shooting star & Cosmic Wish shimmer
  public playWishSend() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 1.2);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 1.45);

    // Celestial chime chord
    [783.99, 987.77, 1174.66, 1567.98].forEach((f, idx) => {
      const cOsc = ctx.createOscillator();
      const cGain = ctx.createGain();
      const delay = 0.8 + idx * 0.08;

      cOsc.type = "triangle";
      cOsc.frequency.setValueAtTime(f, now + delay);

      cGain.gain.setValueAtTime(0.001, now + delay);
      cGain.gain.linearRampToValueAtTime(0.12, now + delay + 0.03);
      cGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.2);

      cOsc.connect(cGain);
      cGain.connect(dest);
      cOsc.start(now + delay);
      cOsc.stop(now + delay + 1.3);
    });
  }

  // Countdown beep / chime
  public playCountdownTick(num: number) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = num === 1 ? 880 : 587.33;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  // Firework rocket launch whoosh
  public playFireworkLaunch() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.65);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Deep resonant firework explosion with crackle
  public playFireworkExplode() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;

    // 1. Deep sub bass boom
    const boomOsc = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boomOsc.type = "sine";
    boomOsc.frequency.setValueAtTime(120, now);
    boomOsc.frequency.exponentialRampToValueAtTime(35, now + 0.55);

    boomGain.gain.setValueAtTime(0.35, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    boomOsc.connect(boomGain);
    boomGain.connect(dest);
    boomOsc.start(now);
    boomOsc.stop(now + 0.7);

    // 2. Crackle noise burst
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(dest);

    noise.start(now + 0.05);
    noise.stop(now + 0.8);
  }

  // Sweet treat crystal chime
  public playSweetChime() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const freqs = [659.25, 830.61, 987.77, 1318.51];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = idx * 0.06;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.15, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.9);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now + delay);
      osc.stop(now + delay + 1.0);
    });
  }

  // Decoration toggle click
  public playDecorationToggle() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.38);
  }

  // Rangoli color placement drop
  public playRangoliTap() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(740, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Celebration victory fanfare
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = idx * 0.09;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.2, now + delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.4);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now + delay);
      osc.stop(now + delay + 1.5);
    });
  }

  public playPaperRustle() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(1200, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    noise.start(now);
    noise.stop(now + 0.36);
  }

  // Gentle meditative festive background music (Tanpura + Sitar harmonics)
  public startBGM() {
    if (this.isBgmPlaying) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;

    this.isBgmPlaying = true;
    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.12, ctx.currentTime);
    this.bgmGain.connect(dest);

    // Warm Indian Tanpura Drone (Sa - Pa - Sa' in D: 146.83Hz, 220Hz, 293.66Hz)
    const droneFreqs = [146.83, 220.0, 293.66];
    droneFreqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.bgmGain!);
      osc.start();
    });

    // Gentle recurring ambient sitar/bell notes (pentatonic raga)
    const ragaNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];
    let noteIdx = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.isBgmPlaying || !this.ctx || this.isMuted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const note = ragaNotes[noteIdx % ragaNotes.length];
      noteIdx++;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(note, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      osc.connect(gain);
      gain.connect(this.bgmGain!);

      osc.start(now);
      osc.stop(now + 2.5);
    }, 2800);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    }
  }

  // Grand Finale: Your Name, Written in Light - Celestial Harmonic Resonance
  public playNameInLight() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    const dest = this.getDestination();
    if (!ctx || !dest) return;
    const now = ctx.currentTime;

    // Ethereal chord based on 432Hz natural harmonic tuning
    const freqs = [216, 288, 360, 432, 576, 720, 864];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = idx * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + delay + 4.0);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now + delay);
      osc.stop(now + delay + 4.2);
    });
  }
}

export const sound = new SoundEngine();
