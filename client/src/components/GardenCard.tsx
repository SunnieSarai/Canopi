import React, { useMemo, useState } from "react";
import SeedCard from "./SeedCard";
import { addSeed } from "../api/api";

type Task = { _id: string; text: string };
type Seed = { _id: string; name: string; displayId?: number; plot?: string; tasks: Task[] };
type Garden = { _id: string; name: string; location?: string; seeds: Seed[] };

export default function GardenCard({ garden, onRefresh }: { garden: Garden; onRefresh?: () => void }) {
  const [seedName, setSeedName] = useState("");
  const [plot, setPlot] = useState("");
  const grouped = useMemo(() => {
    // group seeds by plot (empty -> "General")
    const map = new Map<string, Seed[]>();
    garden.seeds?.forEach(s => {
      const p = s.plot || "General";
      if (!map.has(p)) map.set(p, []);
      map.get(p)!.push(s);
    });
    return map;
  }, [garden.seeds]);

  const handleAddSeed = async () => {
    if (!seedName.trim()) return;
    try {
      await addSeed(garden._id, { name: seedName.trim(), plot, displayId: Date.now() % 100000 }); // simple displayId
      setSeedName("");
      setPlot("");
      onRefresh?.();
    } catch (e) { console.error(e); }
  };

  return (
    <article className="garden-card">
      <div className="garden-title">
        <h2>{garden.name}</h2>
        <div className="garden-meta">{garden.location || ""}</div>
      </div>

      {[...grouped.entries()].map(([plotName, seeds]) => (
        <section className="plot-group" key={plotName}>
          <div className="plot-title">{plotName}</div>
          <div className="seed-list">
            {seeds.map(seed => <SeedCard key={seed._id} seed={seed} gardenId={garden._id} onRefresh={onRefresh} />)}
          </div>
        </section>
      ))}

      <div className="form-row">
        <input className="input" placeholder="Seed name" value={seedName} onChange={e => setSeedName(e.target.value)} />
        <input className="input" placeholder="Plot (e.g., Daughter)" value={plot} onChange={e => setPlot(e.target.value)} />
        <button className="btn" onClick={handleAddSeed}>Plant Seed</button>
      </div>
    </article>
  );
}
