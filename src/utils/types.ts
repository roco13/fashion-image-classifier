export interface Prediction {
  label: string;
  probability: number;
}

export interface ClassificationResult {
  // topPredictions: Prediction[];
  // topPrediction: Prediction;
  // confidence: number;
  predictions: Prediction[];
  topLabel: string;
  confidence: number;
}
