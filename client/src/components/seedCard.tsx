import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { addTask } from "../api/api";

type Task = { _id: string; text: string };
type Seed = { _id: string; name: string; displayId?: number; plot?: string; tasks: Task[] };

export default function SeedCard({ seed, gardenId, onRefresh }: { seed: Seed; gardenId: string; onRefresh?: () => void }) {
  const [taskText, setTaskText] = useState("");

  const handleAdd = async () => {
    if (!taskText.trim()) return;
    try {
      await addTask(seed._id, { text: taskText.trim() });
      setTaskText("");
      onRefresh?.();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="seed-card">
      <div className="seed-left">
        <div className="seed-name">{seed.name} <small style={{color:'#62433a'}}>#{seed.displayId ?? ""}</small></div>
        <div className="seed-plot">{seed.plot}</div>

        <div className="task-list">
          {seed.tasks?.map(t => <TaskItem key={t._id} task={t} seedId={seed._id} onRefresh={onRefresh} />)}
        </div>

        <div className="form-row">
          <input className="input" placeholder="Add small task" value={taskText} onChange={(e)=>setTaskText(e.target.value)} />
          <button className="btn" onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}
