const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000/api";
// ===== GARDEN API =====
export async function getGardens() {
  const res = await fetch(`${API_BASE}/gardens`);
  if (!res.ok) throw new Error("Failed to fetch gardens");
  return res.json();
}

export async function createGarden(payload: { name: string; location?: string }) {
  const res = await fetch(`${API_BASE}/gardens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Create garden failed");
  return res.json();
}

export async function deleteGarden(gardenId: string) {
  const res = await fetch(`${API_BASE}/gardens/${gardenId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete garden failed");
  return res.json();
}

// ===== PLOT API =====
export async function addPlot(gardenId: string, payload: { name: string }) {
  const res = await fetch(`${API_BASE}/gardens/${gardenId}/plots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Add plot failed");
  return res.json();
}

export async function deletePlot(gardenId: string, plotId: string) {
  const res = await fetch(`${API_BASE}/gardens/${gardenId}/plots/${plotId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete plot failed");
  return res.json();
}

// ===== SEED API (inside a plot) =====
export async function addSeedToPlot(gardenId: string, plotId: string, payload: { name: string }) {
  const res = await fetch(`${API_BASE}/gardens/${gardenId}/plots/${plotId}/seeds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Add seed failed");
  return res.json();
}

export async function deleteSeed(gardenId: string, plotId: string, seedId: string) {
  const res = await fetch(`${API_BASE}/gardens/${gardenId}/plots/${plotId}/seeds/${seedId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete seed failed");
  return res.json();
}

// ===== TASK API (inside a plot's seed) =====
export async function addTaskToSeed(
  gardenId: string,
  plotId: string,
  seedId: string,
  payload: { text: string }
) {
  const res = await fetch(`${API_BASE}/gardens/${gardenId}/plots/${plotId}/seeds/${seedId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Add task failed");
  return res.json();
}

export async function deleteTask(
  gardenId: string,
  plotId: string,
  seedId: string,
  taskId: string
) {
  const res = await fetch(
    `${API_BASE}/gardens/${gardenId}/plots/${plotId}/seeds/${seedId}/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) throw new Error("Delete task failed");
  return res.json();
}

export async function toggleTaskCompletion(
  gardenId: string,
  plotId: string,
  seedId: string,
  taskId: string
) {
  const res = await fetch(
    `${API_BASE}/gardens/${gardenId}/plots/${plotId}/seeds/${seedId}/tasks/${taskId}/toggle`,
    {
      method: "PATCH",
    }
  );
  if (!res.ok) throw new Error("Toggle task failed");
  return res.json();
}