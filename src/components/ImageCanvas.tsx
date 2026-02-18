import { useEffect } from "react";

interface ImageCanvasProps {
  file: File | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  width?: number;
  height?: number;
}

export default function ImageCanvas({
  file,
  canvasRef,
  width = 224,
  height = 224,
}: ImageCanvasProps) {
  useEffect(() => {
    if (!file) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.src = url;

    img.onload = () => {
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Clear previous image
      ctx.clearRect(0, 0, width, height);

      // Draw resized image into canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Clean up object URL
      URL.revokeObjectURL(url);
    };
  }, [file, canvasRef, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: "none" }} // hidden, used only for ML
    />
  );
}
