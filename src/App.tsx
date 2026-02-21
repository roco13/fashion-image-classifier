import { useState, useRef } from "react";
import UploadArea from "./components/UploadArea";
import ImagePreview from "./components/ImagePreview";
import ResultsPannel from "./components/ResultsPannel";

import { classifyFashionImage } from "./utils/classifyFashionImage";
import type { Prediction } from "./utils/classifyFashionImage";

/* ---------- App State Machine ---------- */
type AppState = "idle" | "loading" | "success" | "error";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [appState, setAppState] = useState<AppState>("idle");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isImageReady, setIsImageReady] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  /* ---------- User uploads an image ---------- */
  const handleFileSelect = (file: File) => {
    setFile(file);
    setIsImageReady(false);
    setAppState("idle");
    setPredictions([]);
    setError(null);
  };

  /* ---------- Run classification ---------- */
  const handleAnalyze = async () => {
    if (!imgRef.current) return;

    setAppState("loading");

    try {
      const results = await classifyFashionImage(imgRef.current);
      // console.log("Predictions in App:", results);

      //console.log("results", results);

      setPredictions(results);
      setAppState("success");
    } catch (err) {
      console.error("Classification error", err);
      setError("Failed to analyze image.");
      setAppState("error");
    }
  };

  return (
    <>
      <div className="app app-container">
        <h1>Fashion Image Classifier (Custom Model)</h1>
        <p>Upload an image to classify clothing</p>
        <UploadArea onImageSelect={handleFileSelect} />

        {file && (
          <>
            <ImagePreview
              file={file}
              imgRef={imgRef}
              onImageLoad={() => setIsImageReady(true)}
            />
            <p>{file.name}</p>

            <button
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={appState === "loading" || !isImageReady}
            >
              {appState === "loading" ? "Analyzing..." : "Analyze"}
            </button>
          </>
        )}
        {/* ---------- Results ---------- */}
        {appState === "success" && predictions.length > 0 && (
          <div>
            <ResultsPannel predictions={predictions} />
          </div>
        )}

        {appState === "error" && <p>{error}</p>}

        {/* <ModelInfo /> */}
      </div>
    </>
  );
}

export default App;
