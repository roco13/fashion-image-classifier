import { useEffect, useState } from "react";

interface ImagePreviewProps {
  file: File | null;
}

export default function ImagePreview({ file }: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    //clean up to prevent memory leaks
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!previewUrl) return null;

  return (
    <div className="image-preview">
      <img src={previewUrl} alt="Uploaded preview" />
    </div>
  );
}
