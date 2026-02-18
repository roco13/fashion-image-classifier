export default function ModelInfo() {
  return (
    <details className="model-info">
      <summary>Model Details & Limitations</summary>
      <div className="model-info-content">
        <p>
          This application uses MobileNet v2 through TensorFlow.js to classify
          clothing images directly in the browser. The model runs entirely
          client-side with no backend.
        </p>
        <p>
          MobileNet was trained on the ImageNet dataset, which is not
          fashion-specific. A custom interpretation layer maps the model's
          predictions into retail-style categories.
        </p>

        <p>
          Because the model is not trained exclusively on clothing data,
          visually similar garments (e.g., skirts and dresses) may occasionally
          be misclassified. Certain items such as trousers may also be
          inconsistently categorized due to dataset bias in the model’s original
          training data.
        </p>
        {/* <p>
          A future version will fine-tune a model on a dedicated fashion dataset
          to improve retail-level accuracy.
        </p> */}
      </div>
    </details>
  );
}
