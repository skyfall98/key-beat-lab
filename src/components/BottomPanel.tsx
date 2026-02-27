import { Music, Upload, Disc3 } from "lucide-react";
import { useState } from "react";

const defaultSamples = [
  { name: "Kick 808", type: "kick", duration: "0.4s" },
  { name: "Snare Crack", type: "snare", duration: "0.2s" },
  { name: "Hi-Hat Closed", type: "hihat", duration: "0.1s" },
  { name: "Hi-Hat Open", type: "hihat", duration: "0.3s" },
  { name: "808 Sub", type: "bass", duration: "0.8s" },
  { name: "Clap", type: "snare", duration: "0.2s" },
];

type Tab = "default" | "my" | "upload";

export function BottomPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("default");

  return (
    <div className="h-[200px] border-t border-border bg-card shrink-0">
      {/* Tab bar */}
      <div className="flex items-center border-b border-border px-4">
        {(["default", "my", "upload"] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === tab
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {tab === "default" ? "Default Kit" : tab === "my" ? "My Samples" : "Upload"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 overflow-auto h-[calc(200px-41px)] scrollbar-dark">
        {activeTab === "default" && (
          <div className="grid grid-cols-6 gap-2">
            {defaultSamples.map((sample, i) => (
              <div
                key={i}
                className="bg-muted/50 border border-border rounded-md p-3 hover:bg-muted/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Disc3 className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs text-foreground truncate">{sample.name}</span>
                </div>
                {/* Simple waveform bars */}
                <div className="flex items-end gap-px h-6 mt-1">
                  {Array.from({ length: 20 }, (_, j) => (
                    <div
                      key={j}
                      className="w-1 bg-muted-foreground/30 rounded-full"
                      style={{ height: `${Math.random() * 100}%`, minHeight: 2 }}
                    />
                  ))}
                </div>
                <span className="text-[9px] text-muted-foreground mt-1 block">{sample.duration}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "my" && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Music className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No samples uploaded yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Upload your own sounds to use in beats</p>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-muted-foreground/40 transition-colors cursor-pointer w-full max-w-md">
              <Upload className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Drop MP3 or WAV files here
              </p>
              <p className="text-[10px] text-muted-foreground/50 mt-1">Max 10MB per file</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
