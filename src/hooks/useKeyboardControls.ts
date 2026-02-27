import { useEffect, useCallback } from "react";
import { TRACK_KEYS } from "./useKeyboardMapping";
import { TrackId } from "./useSequencer";

interface UseKeyboardProps {
  toggleStep: (trackId: TrackId, stepIndex: number) => void;
  triggerSound: (trackId: TrackId) => void;
  togglePlayback: () => void;
}

export function useKeyboard({ toggleStep, triggerSound, togglePlayback }: UseKeyboardProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Space = play/stop
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayback();
        return;
      }

      // Ctrl+S = save (prevent default)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        return;
      }

      // Prevent default for function keys
      if (e.key.startsWith("F") && e.key.length > 1) {
        e.preventDefault();
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      for (const [trackId, keys] of Object.entries(TRACK_KEYS)) {
        const stepIndex = keys.indexOf(key);
        if (stepIndex !== -1) {
          e.preventDefault();
          toggleStep(trackId as TrackId, stepIndex);
          triggerSound(trackId as TrackId);
          return;
        }
      }
    },
    [toggleStep, triggerSound, togglePlayback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
