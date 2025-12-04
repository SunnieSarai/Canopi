import React from "react";
import { deleteTask } from "../api/api";

export default function TaskItem({ task, seedId, onRefresh }: { task: { _id: string; text: string }, seedId: string, onRefresh?: ()=>void }) {
  const handleDelete = async () => {
    try {
      await deleteTask(seedId, task._id);
      onRefresh?.();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="task-item">
      <span>{task.text}</span>
      <button style={{ marginLeft: 8, background: "transparent", border: "none", cursor: "pointer" }} onClick={handleDelete}>🗑️</button>
    </div>
  );
}
