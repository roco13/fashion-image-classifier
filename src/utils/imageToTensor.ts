import * as tf from "@tensorflow/tfjs";

export function imageToTensor(imageElement: HTMLImageElement): tf.Tensor4D {
  return tf.tidy(() => {
    return tf.browser
      .fromPixels(imageElement)
      .resizeBilinear([224, 224])
      .toFloat()
      .div(127.5)
      .sub(1)
      .expandDims(0) as tf.Tensor4D;
  });
}
