# Fashion AI Classification System

A production-oriented Fashion AI system designed for retail and apparel classification, built with React and FastAPI.

The project evolves across multiple architectural versions — from in-browser inference to backend fine-tuned deep learning with modular fashion-specific attribute extraction.

# Architectural Evolution

This project was built in three architectural versions to demonstrate system-level AI engineering decisions.

---

## Version 1 – In-Browser Inference (TFJS)

Branch: `main`

- React + Vite
- TensorFlow.js
- MobileNet (pretrained)
- Custom retail interpretation layer
- Fully client-side inference

### Limitation

Generic ImageNet model → inaccurate fashion-specific predictions.

### Live Demo

[https://fashion-image-classifier.vercel.app](https://fashion-image-classifier.vercel.app)

---

## Version 2 – Backend Fine-Tuned Model

Branch: `v2-model`

- React frontend
- FastAPI backend
- Fine-tuned MobileNetV2 (.keras)
- Trained on curated DeepFashion subset (7 categories)

### Architecture

```
Frontend (React)
⬇
FastAPI Backend
⬇
MobileNetV2 Fine-Tuned Model
```

### Categories

- Blouse
- Cardigan
- Dress
- Jeans
- Skirt
- Tank
- Tee

The selected categories reflect common retail garment taxonomy, focusing on commercially relevant apparel classes.

### Live Demo

[https://fashion-image-classifier-v2.vercel.app](https://fashion-image-classifier-v2.vercel.app)

---

## Version 3 – Modular Attribute System

Branch: `attribute-color`

Extends the classification pipeline with a modular attribute layer without retraining the base neural network.

### New Features

- Dominant color extraction (KMeans clustering)
- Blue color refinement (Sky Blue, Navy Blue, etc.)
- Structured API response

```
JSON
{
  "category": "Jeans",
  "confidence": 0.9998,
  "attributes": {
    "color": "Navy Blue"
  }
}
```

### Architecture

Frontend (React)
⬇
FastAPI Backend (Render)
⬇
Fine-Tuned MobileNetV2 (Classification)
⬇
Attribute Extraction Layer (Color – KMeans)

### Live Demo

[https://fashion-image-attribute-color.vercel.app](https://fashion-image-attribute-color.vercel.app)

Backend hosted on Render Free Tier. Cold starts may occur.

---

## Limitations

- **Limited Category Scope**
  The fine-tuned model is trained on a curated subset of DeepFashion (7 categories). It does not generalize to all garment types.

- **Dataset Constraints**  
  Training data was filtered and reorganized from DeepFashion. Class imbalance and dataset bias may affect performance.

- **Color Detection Heuristic**  
  Color extraction uses KMeans clustering and rule-based refinement.  
  It does not perform semantic garment segmentation and may be affected by:

  - Background color
  - Lighting conditions
  - Multi-color garments

- **No Garment Segmentation**  
  Background removal is not currently applied in the production pipeline.

- **Render Free Tier Backend**  
  The backend is hosted on Render’s free tier, which may:
  - Sleep after inactivity
  - Introduce cold-start latency
  - Limit scalability

---

## Model Training Details

Transfer learning was used to leverage ImageNet feature extraction while adapting the model to fashion-specific categories.

### Base Model

- MobileNetV2 (ImageNet pretrained)
- Transfer Learning
- Fine-tuned on DeepFashion subset

### Dataset

- Source: DeepFashion (Category & Attribute Prediction Benchmark)
- Total images used: ~158,000+
- Train split: ~133,000
- Validation split: ~25,000

### Training Strategy

1. Frozen base model training (5 epochs)
2. Fine-tuning last layers (3 epochs)
3. Data augmentation applied
4. Normalization to [-1, 1]

### Deployment Format

- Model exported as `.keras`
- Loaded once at FastAPI startup
- Inference performed server-side

### Model Performance

- Validation accuracy after fine-tuning: ~78%

- Observed strengths:

  - High confidence on visually distinctive categories (e.g., Jeans, Cardigan)
  - Strong performance on single-garment images with neutral backgrounds

- Observed challenges:
  - Visual similarity between Dresses and Skirts
  - Confusion among top categories (Blouse, Tee, Cardigan)
  - Performance degradation with complex backgrounds

---

## Author

Rocio Fernandez-Giro  
Front-End Developer building production-ready AI-powered full-stack applications
