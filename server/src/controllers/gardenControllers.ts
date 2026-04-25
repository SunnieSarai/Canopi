
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

export const addTask = async (req: Request, res: Response) => {
  try {
    const { seedId } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Task text is required" });

    // Find the garden that has this seed
    const garden = await Garden.findOne({ "seeds._id": seedId });
    if (!garden) return res.status(404).json({ message: "Seed not found" });

    // Find the seed
    const seed = garden.seeds.id(seedId);
    if (!seed) return res.status(404).json({ message: "Seed not found in garden" });

    // Add the task
    seed.tasks.push({ text });

    // Save
    await garden.save();

    // Return only the updated seed
    res.status(201).json(seed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { seedId, taskId } = req.params;

    // Find the garden
    const garden = await Garden.findOne({ "seeds._id": seedId });
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
