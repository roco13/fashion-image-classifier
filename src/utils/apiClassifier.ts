import type { Prediction } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export async function classifyFashionImage(file: File): Promise<Prediction[]> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const data = await response.json();
  console.log("API response data:", data);
  return data.predictions;
}
