import type { Prediction } from "./mobilenetClassifier";

const CATEGORY_MAP: Record<string, string> = {
  gown: "Dress",
  hoopskirt: "Dress",
  overskirt: "Skirt",
  miniskirt: "Skirt",
  sarong: "Skirt",

  cardigan: "Cardigan",
  sweatshirt: "Top",
  poncho: "Top",
  stole: "Top",
  "lab coat": "Top",
  pajama: "Top",
  jersey: "Top",

  wool: "Sweater",
  sweater: "Sweater",

  "running shoe": "Sneakers",
  sandal: "Sandals",
  boot: "Boots",

  suit: "Suit",
};

const FASHION_KEYWORDS = [
  "dress",
  "gown",
  "skirt",
  "coat",
  "jacket",
  "cardigan",
  "shirt",
  "blouse",
  "sweater",
  "jean",
  "trouser",
  "pant",
  "sneaker",
  "shoe",
  "sandal",
  "boot",
  "bag",
  "handbag",
  "backpack",
  "poncho",
  "stole",
  "pajama",
];

export function interpretFashionPredictions(
  rawPredictions: Prediction[],
  confidenceThreshold = 0.15
): Prediction[] {
  //Filter fashion-related predictions
  const fashionOnly = rawPredictions.filter((p) =>
    FASHION_KEYWORDS.some((keyword) => p.label.toLowerCase().includes(keyword))
  );
  if (fashionOnly.length === 0) {
    return [];
  }

  //Map to friendly labels
  const mapped = fashionOnly.map((p) => {
    const lower = p.label.toLowerCase();

    for (const key in CATEGORY_MAP) {
      if (lower.includes(key)) {
        return {
          label: CATEGORY_MAP[key],
          probability: p.probability,
        };
      }
    }
    return p;
  });

  //merge identical labels by summing probabilities
  const merged: Record<string, number> = {};
  mapped.forEach((p) => {
    merged[p.label] = (merged[p.label] || 0) + p.probability;
  });

  //Convert back to array and filter by confidence threshold
  const mergedArray: Prediction[] = Object.entries(merged).map(
    ([label, probability]) => ({
      label,
      probability,
    })
  );

  //sort descending
  mergedArray.sort((a, b) => b.probability - a.probability);

  //Apply confidence threshold
  const confident = mergedArray.filter(
    (p) => p.probability >= confidenceThreshold
  );

  return confident.slice(0, 3); // return top 3 predictions
}
