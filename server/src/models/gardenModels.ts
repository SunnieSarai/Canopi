// gardenModels.ts
import mongoose, { Schema, Document, Types, Model } from "mongoose";

// 1. Task schema (smallest unit)
export interface TaskDocument extends Document {
  text: string;
  completed: boolean;  // ← NEW: for task completion toggle
}

const TaskSchema = new Schema<TaskDocument>(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },  // ← NEW
  },
  { _id: true }
);

// 2. Seed schema (short-term goal)
export interface SeedDocument extends Document {
  name: string;
  tasks: Types.DocumentArray<TaskDocument>;
}

const SeedSchema = new Schema<SeedDocument>(
  {
    name: { type: String, required: true },
    tasks: [TaskSchema],
  },
  { _id: true }
);

// 3. Plot schema (smaller goal within garden) ← NEW
export interface PlotDocument extends Document {
  name: string;
  seeds: Types.DocumentArray<SeedDocument>;
}

const PlotSchema = new Schema<PlotDocument>(
  {
    name: { type: String, required: true },
    seeds: [SeedSchema],
  },
  { _id: true }
);

// 4. Garden schema (large goal container)
export interface GardenDocument extends Document {
  name: string;
  location?: string;
  plots: Types.DocumentArray<PlotDocument>;  // ← CHANGED: seeds → plots
}

const GardenSchema = new Schema<GardenDocument>(
  {
    name: { type: String, required: true },
    location: { type: String },
    plots: [PlotSchema],  // ← CHANGED: seeds → plots
  },
  { timestamps: true }
);

const Garden: Model<GardenDocument> = mongoose.model<GardenDocument>(
  "Garden",
  GardenSchema
);

export default Garden;