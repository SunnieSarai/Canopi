
import { Request, Response } from "express";
import Garden  from "../models/gardenModels";

// Get all gardens with seeds and tasks
export const getGardens = async (req: Request, res: Response) => {
  const gardens = await Garden.find();
  res.json(gardens);
};

// Create a new garden
export const createGarden = async (req: Request, res: Response) => {
  const { name, location } = req.body;
  const garden = new Garden({ name, location, seeds: [] });
  await garden.save();
  res.status(201).json(garden);
};

// Add a seed to a garden
export const addSeed = async (req: Request, res: Response) => {
  const { gardenId } = req.params;
  const { name, displayId } = req.body; // displayId can start at 100
  const garden = await Garden.findById(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });

  garden.seeds.push({ name, displayId, tasks: [] });
  await garden.save();
  res.status(201).json(garden);
};

// Add a task to a seed
export const addTask = async (req: Request, res: Response) => {
  const { seedId } = req.params;
  const { text } = req.body;

  const garden = await Garden.findOne({ "seeds._id": seedId });
  if (!garden) return res.status(404).json({ message: "Seed not found" });

  const seed = garden.seeds.id(seedId);
  seed?.tasks.push({ text });
  await garden.save();
  res.status(201).json(seed);
};

// Delete a task from a seed
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { seedId, taskId, gardenId } = req.params;

    // Find the garden
    const garden = await Garden.findById(gardenId);
    if (!garden) return res.status(404).json({ message: "Garden not found" });

    // Find the seed inside the garden
    const seed = garden.seeds.id(seedId);
    if (!seed) return res.status(404).json({ message: "Seed not found" });

    // Instead of task.remove(), use pull
    seed.tasks.pull(taskId);

    // Save the parent document
    await garden.save();

    res.status(200).json({ message: "Task deleted successfully", seed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
