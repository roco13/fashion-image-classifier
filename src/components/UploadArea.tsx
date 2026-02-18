import { useRef } from "react";

interface UploadAreaProps {
  onImageSelect: (file: File) => void;
}
export default function UploadArea({ onImageSelect }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="upload-area">
      {/* <input type="file" accept="image/*" onChange={handleChange} /> */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <button onClick={handleClick} className="upload-button">
        Upload Image
      </button>
    </div>
  );
}
