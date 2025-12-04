const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

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

export async function addSeed(gardenId: string, payload: { name: string; plot?: string; displayId?: number }) {
  const res = await fetch(`${API_BASE}/gardens/${gardenId}/seeds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Add seed failed");
  return res.json();
}

export async function addTask(seedId: string, payload: { text: string }) {
  const res = await fetch(`${API_BASE}/seeds/${seedId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Add task failed");
  return res.json();
}

export async function deleteTask(seedId: string, taskId: string, gardenId?: string) {
  // your server delete route expects /seeds/:seedId/tasks/:taskId
  const res = await fetch(`${API_BASE}/seeds/${seedId}/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete task failed");
  return res.json();
}
