import { useState, useRef, useEffect } from "react";
import UploadArea from "./components/UploadArea";
import ImagePreview from "./components/ImagePreview";
import ResultsPannel from "./components/ResultsPannel";
import { classifyFashionImage } from "./utils/apiClassifier";
import type { Prediction } from "./utils/types";

/* ---------- App State Machine ---------- */
type AppState = "idle" | "loading" | "success" | "error";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [appState, setAppState] = useState<AppState>("idle");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isImageReady, setIsImageReady] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  /* ---------- User uploads an image ---------- */
  const handleFileSelect = (file: File) => {
    setFile(file);
    setIsImageReady(false);
    setAppState("idle");
    setPredictions([]);
    setError(null);
  };
  useEffect(() => {
    if (appState === "success" && resultsRef.current) {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [appState]);
  /* ---------- Run classification ---------- */
  const handleAnalyze = async () => {
    if (!file) return;

    setAppState("loading");

    try {
      const results = await classifyFashionImage(file);
      // console.log("Predictions in App:", results);

      //console.log("results", results);

      setPredictions(results);
      console.log("results set in App:", results);
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
            <div className="image-preview">
              <ImagePreview
                file={file}
                imgRef={imgRef}
                onImageLoad={() => setIsImageReady(true)}
              />
            </div>
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
          <div ref={resultsRef}>
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
