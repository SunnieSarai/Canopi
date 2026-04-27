import React, { useEffect, useState } from "react";
import { getGardens, createGarden } from "../api/api";
import GardenCard from "./GardenCard";

type Task = { _id: string; text: string; completed: boolean };
type Plot = { _id: string; name: string; seeds: Seed[] };
type Seed = { _id: string; name: string; tasks: Task[] };
type Garden = { 
  _id: string; 
  name: string; 
  location?: string; 
  plots: Plot[];  // New structure
};

export default function GardenList(): JSX.Element {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getGardens();
      setGardens(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      const g = await createGarden({ name: newName.trim() });
      setGardens(prev => [g, ...prev]);
      setNewName("");
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <input className="input" placeholder="New Garden name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button className="btn" onClick={handleCreate}>Create Garden</button>
      </div>

      {loading ? <div>Loading…</div> : (
        <div className="garden-grid">
          {gardens.map(g => <GardenCard key={g._id} garden={g} onRefresh={load} />)}
        </div>
      )}
    </div>
  );
}
