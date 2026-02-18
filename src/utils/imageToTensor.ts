import * as tf from "@tensorflow/tfjs";

// export function imageToTensor(canvas: HTMLCanvasElement) {
//   return tf.tidy(() => {
//     const tensor = tf.browser.fromPixels(canvas).toFloat();
//     const normalized = tensor.div(255);
//     return normalized as tf.Tensor3D;
//   });
// }
export function imageToTensor(canvas: HTMLCanvasElement) {
  return tf.tidy(() => {
    return tf.browser.fromPixels(canvas);
  });
}
