import { useState, useCallback, useRef, useEffect } from "react";
import * as Tone from "tone";

export type TrackId = "kick" | "snare" | "hihat" | "bass";

export interface Track {
  id: TrackId;
  name: string;
  steps: boolean[];
  volume: number;
  muted: boolean;
}

const STEPS = 16;

const defaultTracks: Track[] = [
  { id: "kick", name: "KICK", steps: Array(STEPS).fill(false), volume: 0, muted: false },
  { id: "snare", name: "SNARE", steps: Array(STEPS).fill(false), volume: 0, muted: false },
  { id: "hihat", name: "HI-HAT", steps: Array(STEPS).fill(false), volume: -3, muted: false },
  { id: "bass", name: "808", steps: Array(STEPS).fill(false), volume: -2, muted: false },
];

// Create synths for each track
function createSynths() {
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 6,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 0.8 },
  }).toDestination();

  const snare = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 },
  }).toDestination();

  const hihat = new Tone.MetalSynth({
    envelope: { attack: 0.001, decay: 0.08, release: 0.01 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination();
  hihat.volume.value = -10;

  const bass = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.01, decay: 0.5, sustain: 0.3, release: 0.8 },
  }).toDestination();

  return { kick, snare, hihat, bass };
}

export function useSequencer() {
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const [bpm, setBpm] = useState(140);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const synthsRef = useRef<ReturnType<typeof createSynths> | null>(null);
  const sequenceRef = useRef<Tone.Sequence | null>(null);
  const tracksRef = useRef(tracks);
  const [triggeredSteps, setTriggeredSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  const ensureSynths = useCallback(async () => {
    if (!synthsRef.current) {
      await Tone.start();
      synthsRef.current = createSynths();
    }
    return synthsRef.current;
  }, []);

  const triggerSound = useCallback(async (trackId: TrackId) => {
    const synths = await ensureSynths();
    switch (trackId) {
      case "kick":
        synths.kick.triggerAttackRelease("C1", "8n");
        break;
      case "snare":
        synths.snare.triggerAttackRelease("8n", undefined, 0.5);
        break;
      case "hihat":
        synths.hihat.triggerAttackRelease("32n", undefined, 0.5);
        break;
      case "bass":
        synths.bass.triggerAttackRelease("C2", "4n");
        break;
    }
  }, [ensureSynths]);

  const toggleStep = useCallback((trackId: TrackId, stepIndex: number) => {
    setTracks(prev =>
      prev.map(t =>
        t.id === trackId
          ? { ...t, steps: t.steps.map((s, i) => (i === stepIndex ? !s : s)) }
          : t
      )
    );
    // Flash the triggered step
    const key = `${trackId}-${stepIndex}`;
    setTriggeredSteps(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setTriggeredSteps(prev => ({ ...prev, [key]: false })), 150);
  }, []);

  const setVolume = useCallback((trackId: TrackId, volume: number) => {
    setTracks(prev =>
      prev.map(t => (t.id === trackId ? { ...t, volume } : t))
    );
  }, []);

  const toggleMute = useCallback((trackId: TrackId) => {
    setTracks(prev =>
      prev.map(t => (t.id === trackId ? { ...t, muted: !t.muted } : t))
    );
  }, []);

  const play = useCallback(async () => {
    const synths = await ensureSynths();
    Tone.getTransport().bpm.value = bpm;

    if (sequenceRef.current) {
      sequenceRef.current.dispose();
    }

    const stepIndices = Array.from({ length: STEPS }, (_, i) => i);
    const seq = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        const currentTracks = tracksRef.current;
        currentTracks.forEach(track => {
          if (track.steps[step] && !track.muted) {
            switch (track.id) {
              case "kick":
                synths.kick.volume.value = track.volume;
                synths.kick.triggerAttackRelease("C1", "8n", time);
                break;
              case "snare":
                synths.snare.volume.value = track.volume;
                synths.snare.triggerAttackRelease("8n", time);
                break;
              case "hihat":
                synths.hihat.volume.value = track.volume - 10;
                synths.hihat.triggerAttackRelease("32n", time, 0.5);
                break;
              case "bass":
                synths.bass.volume.value = track.volume;
                synths.bass.triggerAttackRelease("C2", "4n", time);
                break;
            }
          }
        });
      },
      stepIndices,
      "16n"
    );

    seq.start(0);
    sequenceRef.current = seq;
    Tone.getTransport().start();
    setIsPlaying(true);
  }, [bpm, ensureSynths]);

  const stop = useCallback(() => {
    Tone.getTransport().stop();
    if (sequenceRef.current) {
      sequenceRef.current.dispose();
      sequenceRef.current = null;
    }
    setIsPlaying(false);
    setCurrentStep(-1);
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) stop();
    else play();
  }, [isPlaying, play, stop]);

  useEffect(() => {
    if (isPlaying) {
      Tone.getTransport().bpm.value = bpm;
    }
  }, [bpm, isPlaying]);

  return {
    tracks,
    bpm,
    setBpm,
    isPlaying,
    currentStep,
    toggleStep,
    setVolume,
    toggleMute,
    togglePlayback,
    triggerSound,
    triggeredSteps,
  };
}
