import { useState, useRef, useEffect } from "react";
import UploadArea from "./components/UploadArea";
import ImagePreview from "./components/ImagePreview";
import ImageCanvas from "./components/ImageCanvas";
import ResultsPannel from "./components/ResultsPanel";
import ModelInfo from "./components/ModelInfo";

import { imageToTensor } from "./utils/imageToTensor";
import { classifyImage } from "./utils/mobilenetClassifier";
import type { Prediction } from "./utils/mobilenetClassifier";
import { categorizeCoarse, refineCategory } from "./utils/fashionInterpreter";

/* ---------- App State Machine ---------- */
type AppState = "idle" | "loading" | "success" | "error";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [appState, setAppState] = useState<AppState>("idle");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ---------- User uploads an image ---------- */
  const handleFileSelect = (file: File) => {
    setFile(file);
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    //console.log("Canvas exists:", canvasRef.current);
    setAppState("loading");
    // console.log("canvasRef.current", canvasRef.current?.toDataURL());
    try {
      const tensor = imageToTensor(canvas);
      // console.log("Tensor shape:", tensor.shape);

      const results = await classifyImage(tensor);
      // console.log("Predictions in App:", results);

      //console.log("results", results);
      tensor.dispose(); // Clean up tensor memory

      const coarse = categorizeCoarse(results);
      const refined = refineCategory(coarse.category, results);

      setPredictions([
        {
          label: refined ?? coarse.category,
          probability: coarse.confidence,
        },
      ]);

      setAppState("success");
    } catch (err) {
      console.error("Error analyzing image", err);
      setError("Failed to analyze image.");
      setAppState("error");
    }
  };

  return (
    <>
      <div className="app app-container">
        <h1>Fashion Image Classifier V2</h1>
        <p>Upload an image to classify clothing</p>
        <UploadArea onImageSelect={handleFileSelect} />

        {file && (
          <>
            <ImageCanvas file={file} canvasRef={canvasRef} />
            <ImagePreview file={file} />
            <p>{file.name}</p>

            <button
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={appState === "loading"}
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

        <ModelInfo />
      </div>
    </>
  );
}

export default App;
