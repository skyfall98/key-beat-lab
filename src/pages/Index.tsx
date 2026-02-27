import { TopBar } from "@/components/TopBar";
import { SequencerGrid } from "@/components/SequencerGrid";
import { BottomPanel } from "@/components/BottomPanel";
import { useSequencer } from "@/hooks/useSequencer";
import { useKeyboard } from "@/hooks/useKeyboardControls";

const Index = () => {
  const {
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
  } = useSequencer();

  useKeyboard({ toggleStep, triggerSound, togglePlayback });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <TopBar
        bpm={bpm}
        setBpm={setBpm}
        isPlaying={isPlaying}
        togglePlayback={togglePlayback}
      />
      <SequencerGrid
        tracks={tracks}
        currentStep={currentStep}
        toggleStep={toggleStep}
        setVolume={setVolume}
        toggleMute={toggleMute}
        triggeredSteps={triggeredSteps}
      />
      <BottomPanel />
    </div>
  );
};

export default Index;
