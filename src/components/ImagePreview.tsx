interface ImagePreviewProps {
  file: File;
  imgRef: React.RefObject<HTMLImageElement | null>;
  onImageLoad: () => void;
}

export default function ImagePreview({
  file,
  imgRef,
  onImageLoad,
}: ImagePreviewProps) {
  const previewUrl = URL.createObjectURL(file);

  return (
    <img
      ref={imgRef}
      src={previewUrl}
      alt="Preview"
      onLoad={onImageLoad}
      style={{ maxWidth: "300px" }}
    />
  );
}
