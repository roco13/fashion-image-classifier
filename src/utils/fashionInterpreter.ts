import type { Prediction } from "./mobilenetClassifier";

export type RetailCategory =
  | "Upperwear"
  | "Lowerwear"
  | "Outerwear"
  | "Footwear"
  | "Bag"
  | "Other";

const RETAIL_MAP: Record<string, RetailCategory> = {
  // Dresses & Skirts
  gown: "Lowerwear",
  hoopskirt: "Lowerwear",
  overskirt: "Lowerwear",
  miniskirt: "Lowerwear",
  sarong: "Lowerwear",
  skirt: "Lowerwear",
  dress: "Lowerwear",

  // Tops
  cardigan: "Upperwear",
  sweatshirt: "Upperwear",
  sweater: "Upperwear",
  wool: "Upperwear",
  jersey: "Upperwear",
  blouse: "Upperwear",
  shirt: "Upperwear",
  pajama: "Upperwear",
  stole: "Upperwear",

  // Outerwear
  coat: "Outerwear",
  jacket: "Outerwear",
  "lab coat": "Outerwear",
  poncho: "Outerwear",

  // Pants
  jean: "Lowerwear",
  trouser: "Lowerwear",
  pant: "Lowerwear",

  // Footwear
  sneaker: "Footwear",
  shoe: "Footwear",
  sandal: "Footwear",
  boot: "Footwear",

  // Bags
  bag: "Bag",
  handbag: "Bag",
  backpack: "Bag",
};

export function categorizeCoarse(rawPredictions: Prediction[]): {
  category: RetailCategory;
  confidence: number;
} {
  const scores: Record<RetailCategory, number> = {
    Upperwear: 0,
    Lowerwear: 0,
    Outerwear: 0,
    Footwear: 0,
    Bag: 0,
    Other: 0,
  };

  rawPredictions.forEach((p) => {
    const lower = p.label.toLowerCase();

    //find first matching retail keyword
    const matchedKey = Object.keys(RETAIL_MAP).find((key) =>
      lower.includes(key)
    );

    if (matchedKey) {
      const category = RETAIL_MAP[matchedKey];
      scores[category] += p.probability;
    } else {
      scores["Other"] += p.probability;
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const [topCategory, score] = sorted[0];

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  return {
    category: topCategory as RetailCategory,
    confidence: score,
  };
}

export function refineCategory(
  coarseCategory: RetailCategory,
  rawPredictions: Prediction[]
): string | null {
  if (coarseCategory === "Upperwear") {
    let sweaterScore = 0;
    let blouseScore = 0;
    let shirtScore = 0;
    rawPredictions.forEach((p) => {
      const lower = p.label.toLowerCase();

      if (
        lower.includes("swater") ||
        lower.includes("cardigan") ||
        lower.includes("wool")
      ) {
        sweaterScore += p.probability;
      }

      if (lower.includes("blouse")) {
        blouseScore += p.probability;
      }
      if (lower.includes("shirt") || lower.includes("jersey")) {
        shirtScore += p.probability;
      }
    });

    const maxScore = Math.max(sweaterScore, blouseScore, shirtScore);

    if (maxScore === sweaterScore) return "Sweater";
    if (maxScore === blouseScore) return "Blouse";
    if (maxScore === shirtScore) return "Shirt";

    return "Top";
  }

  if (coarseCategory == "Lowerwear") {
    let dressScore = 0;
    let skirtScore = 0;
    let pantsScore = 0;
    let jeansScore = 0;

    rawPredictions.forEach((p) => {
      const lower = p.label.toLowerCase();

      if (lower.includes("gown") || lower.includes("dress")) {
        dressScore += p.probability;
      }

      if (lower.includes("skirt")) {
        skirtScore += p.probability;
      }

      if (lower.includes("trouser") || lower.includes("pant")) {
        pantsScore += p.probability;
      }

      if (lower.includes("jean")) {
        jeansScore += p.probability;
      }
    });

    const maxScore = Math.max(dressScore, skirtScore, pantsScore, jeansScore);

    if (maxScore === dressScore) return "Dress";
    if (maxScore === skirtScore) return "Skirt";
    if (maxScore === pantsScore) return "Pants";
    if (maxScore === jeansScore) return "Jeans";

    return "Bottom";
  }
  return null;
}
