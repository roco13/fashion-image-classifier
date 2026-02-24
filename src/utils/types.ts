export interface Prediction {
  label: string;
  probability: number;
}

export interface ClassificationResult {
  predictions: Prediction[];
  topLabel: string;
  confidence: number;
}
