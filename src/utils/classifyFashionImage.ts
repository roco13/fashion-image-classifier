import * as tf from "@tensorflow/tfjs";
import { loadFashionModel } from "./loadModel";
import { imageToTensor } from "./imageToTensor";
import { FASHION_LABELS } from "./fashionLabels";

export interface Prediction {
  label: string;
  probability: number;
}

export async function classifyFashionImage(
  imageElement: HTMLImageElement
): Promise<Prediction[]> {
  const model = await loadFashionModel();

  const tensor = imageToTensor(imageElement);

  const predictions = model.predict(tensor) as tf.Tensor;

  const data = await predictions.data();

  tensor.dispose();
  predictions.dispose();

  const results = FASHION_LABELS.map((label, i) => ({
    label,
    probability: data[i],
  }));
  results.sort((a, b) => b.probability - a.probability);

  return results;
}
