// scripts/generate-audio.js
// 12.0s Cinematic Tech / Synthwave soundtrack generator for 3D Motion Graphics promo
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sampleRate = 44100;
const duration = 12.0; // Exactly 12.0 seconds
const numSamples = Math.floor(sampleRate * duration);
const bpm = 132; // Energetic, driving 132 BPM
const secondsPerBeat = 60 / bpm; // ~0.4545s

const buffer = Buffer.alloc(44 + numSamples * 4); // 16-bit stereo

// WAV header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * 4, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(2, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 4, 28);
buffer.writeUInt16LE(4, 32);
buffer.writeUInt16LE(16, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * 4, 40);

const arpNotes = [
  293.66, 349.23, 440.00, 587.33, 698.46, 587.33, 440.00, 349.23, // D4, F4, A4, D5, F5, D5, A4, F4
  349.23, 440.00, 523.25, 659.25, 783.99, 659.25, 523.25, 440.00, // F4, A4, C5, E5, G5, E5, C5, A4
  261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63, // C4, E4, G4, C5, E5, C5, G4, E4
  196.00, 246.94, 293.66, 392.00, 493.88, 392.00, 293.66, 246.94  // G3, B3, D4, G4, B4, G4, D4, B3
];

let offset = 44;

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  
  // Master gain envelope
  let masterGain = 1.0;
  if (t < 0.05) masterGain = t / 0.05;
  else if (t > 11.4) masterGain = Math.max(0, (12.0 - t) / 0.6);
  
  const beatTime = t / secondsPerBeat;
  const currentBeat = Math.floor(beatTime);
  const beatFract = beatTime - currentBeat;
  
  let left = 0;
  let right = 0;
  
  // 1. Four-on-the-floor Kick Drum (Aggressive, punchy transient)
  const kickActive = (t >= 0.2 && t < 1.8) || (t >= 2.2 && t < 4.8) || (t >= 5.0 && t < 7.2) || (t >= 7.6 && t < 11.5);
  if (kickActive) {
    const kTime = beatFract * secondsPerBeat;
    if (kTime < 0.22) {
      const kFreq = 190 * Math.exp(-kTime * 34) + 48;
      const kEnv = Math.exp(-kTime * 17);
      const kVal = Math.sin(2 * Math.PI * kFreq * kTime) * kEnv * 0.82;
      left += kVal;
      right += kVal;
    }
  }
  
  // 2. Cinematic Sub Drops & Downbeat Impacts (0.0s, 2.2s, 5.0s, 7.6s, 9.8s)
  const subImpacts = [0.0, 2.2, 5.0, 7.6, 9.8];
  for (const trans of subImpacts) {
    const dt = t - trans;
    if (dt >= 0 && dt < 1.2) {
      const dropFreq = 120 * Math.exp(-dt * 5.2) + 38;
      const dropEnv = Math.exp(-dt * 3.4);
      const sub = Math.sin(2 * Math.PI * dropFreq * dt) * dropEnv * 0.88;
      left += sub;
      right += sub;
    }
  }

  // 3. Terminal Diagnostic Screen Strike Clicks (5.7s, 6.0s, 6.3s)
  const strikes = [5.7, 6.0, 6.3];
  for (const st of strikes) {
    const dt = t - st;
    if (dt >= 0 && dt < 0.18) {
      const sFreq = 880 * Math.exp(-dt * 40) + 120;
      const sEnv = Math.exp(-dt * 28);
      const strikeVal = Math.sin(2 * Math.PI * sFreq * dt) * sEnv * 0.45;
      left += strikeVal * 0.9;
      right += strikeVal * 1.1;
    }
  }

  // 4. Cursor Click Audio Transient (3.1s)
  const dtClick = t - 3.1;
  if (dtClick >= 0 && dtClick < 0.12) {
    const clickEnv = Math.exp(-dtClick * 45);
    const clickVal = Math.sin(2 * Math.PI * 1800 * dtClick) * clickEnv * 0.4;
    left += clickVal;
    right += clickVal;
  }

  // 5. Cyber Bassline (Deep driving saw bass)
  if (t >= 0.5 && t < 11.5) {
    const eighth = secondsPerBeat / 2;
    const eighthTime = (t % eighth) / eighth;
    const bassIdx = Math.floor((t / secondsPerBeat) % 8);
    const bassFreqs = [73.42, 73.42, 87.31, 87.31, 65.41, 65.41, 98.00, 98.00];
    const freq = bassFreqs[bassIdx];
    const env = Math.exp(-eighthTime * 6.5);
    const saw = (2 * ((t * freq) % 1) - 1) * 0.38 * env;
    left += saw * 0.95;
    right += saw * 0.95;
  }

  // 6. Kinetic High-Energy Arpeggiator (16th notes with subtle stereo pan)
  if (t >= 0.8 && t < 11.6) {
    const sixteenth = secondsPerBeat / 4;
    const arpIdx = Math.floor(t / sixteenth) % arpNotes.length;
    const arpFract = (t % sixteenth) / sixteenth;
    const arpFreq = arpNotes[arpIdx];
    const arpEnv = Math.exp(-arpFract * 17);
    const pan = Math.sin(t * 7);
    const arpVal = (Math.sin(2 * Math.PI * arpFreq * t) + 0.35 * Math.sin(4 * Math.PI * arpFreq * t)) * arpEnv * 0.24;
    left += arpVal * (0.5 - 0.45 * pan);
    right += arpVal * (0.5 + 0.45 * pan);
  }

  // 7. Razor-Sharp Hi-Hats
  if (t >= 1.2 && t < 11.5) {
    const sixteenth = secondsPerBeat / 4;
    const hatFract = (t % sixteenth) / sixteenth;
    if (hatFract < 0.05) {
      const noise = (Math.sin(t * 98765.43) * 43758.5453 % 1);
      const hatEnv = Math.exp(-hatFract * 60);
      const hatVal = noise * hatEnv * 0.16;
      left += hatVal * 0.85;
      right += hatVal * 1.15;
    }
  }

  // 8. Exponential Impact Risers (1.8s-2.2s, 4.6s-5.0s, 7.2s-7.6s, 9.4s-9.8s)
  const risers = [2.2, 5.0, 7.6, 9.8];
  for (const r of risers) {
    const dr = r - t;
    if (dr > 0 && dr < 0.4) {
      const prog = 1.0 - dr / 0.4;
      const noise = (Math.sin(t * 44100.12) * 27182.81 % 1);
      const sweep = noise * Math.pow(prog, 3.2) * 0.3;
      left += sweep;
      right += sweep;
    }
  }

  // Master limiting & saturation
  let lOut = Math.max(-1, Math.min(1, left * masterGain * 0.78));
  let rOut = Math.max(-1, Math.min(1, right * masterGain * 0.78));

  buffer.writeInt16LE(Math.floor(lOut * 32767), offset);
  buffer.writeInt16LE(Math.floor(rOut * 32767), offset + 2);
  offset += 4;
}

const outputPath = path.resolve(__dirname, '../assets/music.wav');
fs.writeFileSync(outputPath, buffer);
console.log(`12.0s Cinematic Soundtrack written to ${outputPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
