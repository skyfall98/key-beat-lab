import { Check, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpgradePage = () => {
  const navigate = useNavigate();

  const features = [
    "Unlimited projects",
    "Clean WAV export (no watermark)",
    "Unlimited sample uploads",
    "Priority sample quality",
    "Early access to new features",
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="text-xs text-muted-foreground hover:text-foreground mb-8 block transition-colors"
        >
          ← Back to BeatType
        </button>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Pro</h2>
          </div>
          <p className="text-3xl font-bold text-foreground mt-2">
            €4.99
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </p>

          <ul className="mt-6 space-y-3">
            {features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                <Check className="w-4 h-4 text-track-hihat shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button className="w-full h-10 bg-primary text-primary-foreground rounded font-bold text-sm mt-6 hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
          <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
            Stripe checkout — coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
