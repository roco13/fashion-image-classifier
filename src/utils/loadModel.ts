import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

await tf.setBackend("webgl");
await tf.ready();

export async function loadFashionModel(): Promise<tf.LayersModel> {
  const model = await tf.loadLayersModel("/model/web_model/model.json");

  return model;
}

// export function preprocessImage(imageElement: HTMLImageElement): tf.Tensor {
//   return tf.tidy(() => {
//     return tf.browser
//       .fromPixels(imageElement)
//       .resizeBilinear([224, 224])
//       .toFloat()
//       .div(127.5)
//       .sub(1)
//       .expandDims();
//   });
// }
