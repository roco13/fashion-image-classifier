interface ConfidenceBarProps {
  label: string;
  probability: number;
}

export default function ConfidenceBar({
  label,
  probability,
}: ConfidenceBarProps) {
  const percentage = Math.round(probability * 100);

  return (
    <div className="confidence-bar">
      <div className="confidence-header">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="confidence-track">
        <div
          className="confidence-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
