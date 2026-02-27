import { Track, TrackId } from "@/hooks/useSequencer";
import { TRACK_KEYS, KEY_LABELS } from "@/hooks/useKeyboardMapping";
import { Volume2, VolumeX } from "lucide-react";

interface SequencerGridProps {
  tracks: Track[];
  currentStep: number;
  toggleStep: (trackId: TrackId, stepIndex: number) => void;
  setVolume: (trackId: TrackId, volume: number) => void;
  toggleMute: (trackId: TrackId) => void;
  triggeredSteps: Record<string, boolean>;
}

const trackColorClass: Record<TrackId, { active: string; bg: string; text: string; border: string }> = {
  kick: {
    active: "step-active-kick",
    bg: "bg-track-kick",
    text: "text-track-kick",
    border: "border-track-kick/30",
  },
  snare: {
    active: "step-active-snare",
    bg: "bg-track-snare",
    text: "text-track-snare",
    border: "border-track-snare/30",
  },
  hihat: {
    active: "step-active-hihat",
    bg: "bg-track-hihat",
    text: "text-track-hihat",
    border: "border-track-hihat/30",
  },
  bass: {
    active: "step-active-bass",
    bg: "bg-track-bass",
    text: "text-track-bass",
    border: "border-track-bass/30",
  },
};

export function SequencerGrid({
  tracks,
  currentStep,
  toggleStep,
  setVolume,
  toggleMute,
  triggeredSteps,
}: SequencerGridProps) {
  return (
    <div className="flex-1 overflow-auto scrollbar-dark p-4">
      {/* Step numbers */}
      <div className="flex items-center mb-2 ml-[180px]">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className={`w-10 h-5 flex items-center justify-center text-[9px] font-mono mx-0.5 ${
              i === currentStep ? "text-foreground" : "text-muted-foreground/50"
            } ${i % 4 === 0 ? "text-muted-foreground" : ""}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Tracks */}
      {tracks.map(track => {
        const colors = trackColorClass[track.id];
        const keys = TRACK_KEYS[track.id];

        return (
          <div
            key={track.id}
            className={`flex items-center mb-2 rounded-md border ${colors.border} bg-card/50 py-2 px-2 transition-colors`}
          >
            {/* Track name */}
            <div className="w-20 shrink-0">
              <span className={`text-xs font-bold tracking-wider ${colors.text}`}>
                {track.name}
              </span>
            </div>

            {/* Volume + Mute */}
            <div className="w-[60px] flex items-center gap-1 shrink-0">
              <button
                onClick={() => toggleMute(track.id)}
                className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold transition-colors ${
                  track.muted
                    ? "bg-destructive/20 text-destructive"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {track.muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              </button>
              <input
                type="range"
                min={-20}
                max={6}
                value={track.volume}
                onChange={e => setVolume(track.id, parseInt(e.target.value))}
                className="w-16 h-1 accent-current"
                style={{ accentColor: `hsl(var(--track-${track.id}))` }}
              />
            </div>

            {/* Steps */}
            <div className="flex items-center gap-0.5 ml-2">
              {track.steps.map((active, stepIdx) => {
                const isCurrentStep = stepIdx === currentStep;
                const trigKey = `${track.id}-${stepIdx}`;
                const isTriggered = triggeredSteps[trigKey];
                const keyLabel = KEY_LABELS[keys[stepIdx]] || keys[stepIdx];

                return (
                  <button
                    key={stepIdx}
                    onClick={() => toggleStep(track.id, stepIdx)}
                    className={`
                      w-10 h-10 rounded-sm border transition-all duration-100 flex flex-col items-center justify-center relative
                      ${stepIdx % 4 === 0 ? "ml-1" : ""}
                      ${active ? colors.active : "bg-muted/30 border-border/50 hover:bg-muted/60"}
                      ${isCurrentStep ? "ring-1 ring-foreground/60" : ""}
                      ${isTriggered ? "animate-step-trigger" : ""}
                    `}
                  >
                    {active && (
                      <div
                        className={`w-3 h-3 rounded-full ${colors.bg} opacity-80`}
                      />
                    )}
                    <span className="text-[7px] text-muted-foreground/40 absolute bottom-0.5 hidden lg:block">
                      {keyLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
