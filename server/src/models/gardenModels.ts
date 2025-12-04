// gardenModels.ts
import mongoose, { Schema, Document, Types, Model } from "mongoose";

// 1. Task schema
export interface TaskDocument extends Document {
  text: string;
}

const TaskSchema = new Schema<TaskDocument>(
  {
    text: { type: String, required: true },
  },
  { _id: true } // Mongoose will auto-generate _id
);

// 2. Seed schema
export interface SeedDocument extends Document {
  name: string;
  displayId: number;
  tasks: Types.DocumentArray<TaskDocument>;
}

const SeedSchema = new Schema<SeedDocument>(
  {
    name: { type: String, required: true },
    displayId: { type: Number, required: true },
    tasks: [TaskSchema],
  },
  { _id: true }
);

// 3. Garden schema
export interface GardenDocument extends Document {
  name: string;
  location?: string;
  seeds: Types.DocumentArray<SeedDocument>;
}

const GardenSchema = new Schema<GardenDocument>(
  {
    name: { type: String, required: true },
    location: { type: String },
    seeds: [SeedSchema],
  },
  { timestamps: true }
);

const Garden: Model<GardenDocument> = mongoose.model<GardenDocument>(
  "Garden",
  GardenSchema
);

export default Garden;
