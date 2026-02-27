import { Play, Square, Minus, Plus, Download, Lock, Circle, User, LogIn, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  bpm: number;
  setBpm: (bpm: number) => void;
  isPlaying: boolean;
  togglePlayback: () => void;
}

export function TopBar({ bpm, setBpm, isPlaying, togglePlayback }: TopBarProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-[60px] border-b border-border bg-card flex items-center px-4 gap-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-0.5 mr-4 cursor-pointer" onClick={() => navigate("/")}>
        <span className="text-xl font-bold tracking-tight text-primary">Beat</span>
        <span className="text-xl font-bold tracking-tight text-foreground">Type</span>
      </div>

      <div className="h-6 w-px bg-border" />

      {/* BPM */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase text-muted-foreground tracking-widest">BPM</span>
        <button
          onClick={() => setBpm(Math.max(60, bpm - 1))}
          className="w-6 h-6 flex items-center justify-center rounded bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <input
          type="number"
          value={bpm}
          onChange={e => setBpm(Math.min(200, Math.max(60, parseInt(e.target.value) || 140)))}
          className="w-12 h-7 text-center bg-muted border border-border rounded text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={() => setBpm(Math.min(200, bpm + 1))}
          className="w-6 h-6 flex items-center justify-center rounded bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      <div className="h-6 w-px bg-border" />

      {/* Transport Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlayback}
          className={`w-9 h-9 flex items-center justify-center rounded transition-all ${
            isPlaying
              ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
          <Circle className="w-4 h-4 text-primary" />
        </button>
      </div>

      <div className="h-6 w-px bg-border" />

      {/* Export */}
      <button className="h-8 px-3 flex items-center gap-1.5 rounded bg-secondary text-muted-foreground text-xs hover:bg-secondary/80 transition-colors">
        <Download className="w-3.5 h-3.5" />
        <span>Export</span>
        <Lock className="w-3 h-3 text-muted-foreground/50" />
      </button>

      <div className="flex-1" />

      {/* Keyboard hint */}
      <span className="text-[10px] text-muted-foreground hidden lg:block">
        SPACE play • Keys trigger
      </span>

      <div className="h-6 w-px bg-border" />

      {/* Auth area */}
      {user ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/upgrade")}
            className="h-7 px-2.5 flex items-center gap-1 rounded bg-primary/10 text-primary text-[10px] font-bold hover:bg-primary/20 transition-colors"
          >
            <Zap className="w-3 h-3" />
            Pro
          </button>
          <button
            onClick={signOut}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="h-8 px-3 flex items-center gap-1.5 rounded bg-secondary text-muted-foreground text-xs hover:text-foreground transition-colors"
        >
          <LogIn className="w-3.5 h-3.5" />
          Log in
        </button>
      )}
    </header>
  );
}
