
import { Request, Response } from "express";
import Garden from "../models/gardenModels";

// ===== GARDEN LEVEL =====
// Get all gardens
export const getGardens = async (req: Request, res: Response) => {
  const gardens = await Garden.find();
  res.json(gardens);
};

// Create a new garden
export const createGarden = async (req: Request, res: Response) => {
  const { name, location } = req.body;
  const garden = new Garden({ name, location, plots: [] });
  await garden.save();
  res.status(201).json(garden);
};

// Delete a garden (and all its plots/seeds/tasks)
export const deleteGarden = async (req: Request, res: Response) => {
  const { gardenId } = req.params;
  const garden = await Garden.findByIdAndDelete(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });
  res.status(200).json({ message: "Garden deleted successfully" });
};

// ===== PLOT LEVEL =====
// Add a plot to a garden
export const addPlot = async (req: Request, res: Response) => {
  const { gardenId } = req.params;
  const { name } = req.body;

  const garden = await Garden.findById(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });

  garden.plots.push({ name, seeds: [] });
  await garden.save();
  res.status(201).json(garden);
};

// Delete a plot (and all its seeds/tasks)
export const deletePlot = async (req: Request, res: Response) => {
  const { gardenId, plotId } = req.params;

  const garden = await Garden.findById(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });

  const plot = garden.plots.id(plotId);
  if (!plot) return res.status(404).json({ message: "Plot not found" });

  plot.deleteOne();
  await garden.save();
  res.status(200).json({ message: "Plot deleted successfully" });
};

// ===== SEED LEVEL (inside a plot) =====
// Add a seed to a plot
export const addSeedToPlot = async (req: Request, res: Response) => {
  const { gardenId, plotId } = req.params;
  const { name } = req.body;

  const garden = await Garden.findById(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });

  const plot = garden.plots.id(plotId);
  if (!plot) return res.status(404).json({ message: "Plot not found" });

  plot.seeds.push({ name, tasks: [] });
  await garden.save();
  res.status(201).json(garden);
};

// Delete a seed (and all its tasks)
export const deleteSeed = async (req: Request, res: Response) => {
  const { gardenId, plotId, seedId } = req.params;

  const garden = await Garden.findById(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });

  const plot = garden.plots.id(plotId);
  if (!plot) return res.status(404).json({ message: "Plot not found" });

  const seed = plot.seeds.id(seedId);
  if (!seed) return res.status(404).json({ message: "Seed not found" });

  seed.deleteOne();
  await garden.save();
  res.status(200).json({ message: "Seed deleted successfully" });
};

// ===== TASK LEVEL (inside a plot's seed) =====
// Add a task to a seed
export const addTaskToSeed = async (req: Request, res: Response) => {
  const { gardenId, plotId, seedId } = req.params;
  const { text } = req.body;

  const garden = await Garden.findById(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });

  const plot = garden.plots.id(plotId);
  if (!plot) return res.status(404).json({ message: "Plot not found" });

  const seed = plot.seeds.id(seedId);
  if (!seed) return res.status(404).json({ message: "Seed not found" });

  seed.tasks.push({ text, completed: false });
  await garden.save();
  res.status(201).json(seed);
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { gardenId, plotId, seedId, taskId } = req.params;

  const garden = await Garden.findById(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });

  const plot = garden.plots.id(plotId);
  if (!plot) return res.status(404).json({ message: "Plot not found" });

  const seed = plot.seeds.id(seedId);
  if (!seed) return res.status(404).json({ message: "Seed not found" });

  const task = seed.tasks.id(taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.deleteOne();
  await garden.save();
  res.status(200).json({ message: "Task deleted successfully" });
};

// Toggle task completion (for the checkbox)
export const toggleTaskCompletion = async (req: Request, res: Response) => {
  const { gardenId, plotId, seedId, taskId } = req.params;

  const garden = await Garden.findById(gardenId);
  if (!garden) return res.status(404).json({ message: "Garden not found" });

  const plot = garden.plots.id(plotId);
  if (!plot) return res.status(404).json({ message: "Plot not found" });

  const seed = plot.seeds.id(seedId);
  if (!seed) return res.status(404).json({ message: "Seed not found" });

  const task = seed.tasks.id(taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.completed = !task.completed;
  await garden.save();
  res.status(200).json(task);
};