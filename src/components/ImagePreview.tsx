import { useEffect } from "react";

interface ImagePreviewProps {
  file: File;
  imgRef: React.RefObject<HTMLImageElement | null>;
}

export default function ImagePreview({ file, imgRef }: ImagePreviewProps) {
  const url = URL.createObjectURL(file);

  useEffect(() => {
    //clean up to prevent memory leaks
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <div className="image-preview">
      <img ref={imgRef} src={url} alt="Preview" />
    </div>
  );
}
