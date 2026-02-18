import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

export interface Prediction {
  label: string;
  probability: number;
}

let model: mobilenet.MobileNet | null = null;

//load MobileNet only once

export async function loadMobileNet() {
  if (!model) {
    model = await mobilenet.load({
      version: 2,
      alpha: 1.0,
    });
  }
  return model;
}

// classify an image tensor
export async function classifyImage(
  imageTensor: tf.Tensor3D
): Promise<Prediction[]> {
  const net = await loadMobileNet();
  const predictions = await net.classify(imageTensor);

  return predictions.map((p) => ({
    label: p.className,
    probability: p.probability,
  }));
}
