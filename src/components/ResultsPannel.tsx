import type { Prediction } from "../utils/classifyFashionImage";
import ConfidenceBar from "./ConfidenceBar";

interface ResultsPanelProps {
  predictions: Prediction[];
}

export default function ResultsPannel({ predictions }: ResultsPanelProps) {
  if (!predictions || predictions.length === 0) {
    return null;
  }
  const top = predictions[0];

  return (
    <div className="results-panel">
      <h2 className="results-title"> Prediction</h2>

      <p className="results-category">
        <strong>Category:</strong> {top.label}
      </p>
      <div className="results-bars">
        {predictions.map((p) => (
          <ConfidenceBar
            key={p.label}
            label={p.label}
            probability={p.probability}
          />
        ))}
      </div>
    </div>
  );
}
