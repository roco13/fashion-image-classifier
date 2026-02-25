export interface Prediction {
  label: string;
  probability: number;
  attributes: {
    color?: string;
  };
}

export interface ClassificationResult {
  predictions: Prediction[];
  topLabel: string;
  confidence: number;
}
