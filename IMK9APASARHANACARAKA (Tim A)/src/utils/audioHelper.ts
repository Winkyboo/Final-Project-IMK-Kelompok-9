// Web Audio API Sound Effects Synthesizer
// Provides organic, responsive UI sound feedback without requiring external audio assets.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    // Standard AudioContext initialization with fallback
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  // Resume context if suspended (browser autoplay security policy)
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a wooden block or cutting board knock sound (for Talenan)
 */
export function playWoodChopSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Resonator oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    // Dynamic pitch knock envelope
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.005); // quick click
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08); // rapid decay

    // High frequency click transient for the knife impact
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "sine";
    clickOsc.frequency.setValueAtTime(1200, now);
    clickOsc.frequency.exponentialRampToValueAtTime(300, now + 0.01);
    clickGain.gain.setValueAtTime(0.2, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    // Audio routing
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);

    clickOsc.start(now);
    clickOsc.stop(now + 0.02);
  } catch (error) {
    console.warn("WebGL Audio not supported or failed to run playWoodChopSound:", error);
  }
}

/**
 * Plays a heavy, dry stone thud/grind sound (for Cobek)
 */
export function playStoneGrindSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Low rumble frequency
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);

    // Friction component using narrow bandpass noise
    const noiseLength = ctx.sampleRate * 0.18; // 180 ms of sound
    const buffer = ctx.createBuffer(1, noiseLength, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < noiseLength; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Filter to make it sound gritty and stone-like
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.18);
    filter.Q.setValueAtTime(3.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    // Connections
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);

    noiseSource.start(now);
    noiseSource.stop(now + 0.19);
  } catch (error) {
    console.warn("failed to run playStoneGrindSound:", error);
  }
}

/**
 * Plays a bubbling kettle/cauldron sound (for Anglo Api)
 */
export function playBubblingSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Simulate multiple bubbles rising and popping
    for (let i = 0; i < 4; i++) {
      const startTime = now + i * 0.08;
      const bubbleDuration = 0.06;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      // Bubble frequency sweeps upwards as the bubble rises, then pops
      const baseFreq = 200 + Math.random() * 150;
      osc.frequency.setValueAtTime(baseFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, startTime + bubbleDuration);

      gainNode.gain.setValueAtTime(0.001, startTime);
      gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + bubbleDuration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + bubbleDuration);
    }
  } catch (error) {
    console.warn("failed to run playBubblingSound:", error);
  }
}

/**
 * Plays a sweet high pitch metallic bell ring (for Service Bell)
 */
export function playBellRingSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pleasant high chime bell is composed of multiple metallic frequencies (partials)
    const frequencies = [880, 1200, 1560, 2040];
    const gains = [0.35, 0.22, 0.15, 0.1];
    const decays = [1.5, 0.8, 0.5, 0.3];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gains[idx], now + 0.01); // fast strike
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + decays[idx]); // natural decay

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decays[idx] + 0.1);
    });
  } catch (error) {
    console.warn("failed to run playBellRingSound:", error);
  }
}

/**
 * Optional function to play a cozy market background ambience (using white noise + organic murmurs)
 * This doesn't autoplay, but can be toggled by the user or triggered after gameplay starts!
 */
export function playMarketAmbience() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Generate low-frequency brown noise to represent cozy distant background rumble & crowd hubbub
    const bufferSize = ctx.sampleRate * 2; // 2 seconds of looping brown noise
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise formula: accumulate filter
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 4.5; // compensation volume
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Low pass filter for heavy muffled distance feel
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(150, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.02, now); // extreme subtle cozy murmur

    noiseNode.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start(0);
    return noiseNode; // caller can call .stop() on it
  } catch (e) {
    return null;
  }
}
