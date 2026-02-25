import type { Prediction } from "../utils/types";
// import ConfidenceBar from "./ConfidenceBar";

interface ResultsPanelProps {
  predictions: Prediction[];
}

export default function ResultsPannel({ predictions }: ResultsPanelProps) {
  if (!predictions || predictions.length === 0) {
    return null;
  }
  console.log("Predictions in ResultsPannel:", predictions);
  const top = predictions[0];

  return (
    <div className="results-panel">
      <h2 className="results-title"> Prediction</h2>

      <p className="results-category">
        <strong>Category:</strong> {top.label}
      </p>
      <div className="results-bars">
        <div className="attributes">
          {/* <p>Top category: {predictions[0].label}</p>
          <p>Confidence: {predictions[0].probability}</p>
          <h3>Attributes</h3>
          <span className="chip">{predictions[0].attributes.color}</span> */}
        </div>
        {/* {predictions.map((p) => (
          <ConfidenceBar
            key={p.label}
            label={p.label}
            probability={p.probability}
          />
        ))} */}
      </div>
    </div>
  );
}
