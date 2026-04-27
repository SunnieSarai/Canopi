import React, { useState } from "react";
import { deleteSeed, addTaskToSeed, deleteTask, toggleTaskCompletion } from "../api/api";

interface SeedCardProps {
  gardenId: string;
  plotId: string;  // ← NEW: required for API calls
  seed: {
    _id: string;
    name: string;
    tasks: Array<{
      _id: string;
      text: string;
      completed: boolean;
    }>;
  };
  onRefresh: () => void;
}

export default function SeedCard({ gardenId, plotId, seed, onRefresh }: SeedCardProps) {
  const [newTaskText, setNewTaskText] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  // Calculate completion progress
  const totalTasks = seed.tasks.length;
  const completedTasks = seed.tasks.filter(t => t.completed).length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const isComplete = totalTasks > 0 && completedTasks === totalTasks;

  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;
    setIsAddingTask(true);
    try {
      await addTaskToSeed(gardenId, plotId, seed._id, { text: newTaskText });
      setNewTaskText("");
      setShowAddTask(false);
      onRefresh();
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleDeleteSeed = async () => {
    if (confirm(`Delete seed "${seed.name}" and all its tasks?`)) {
      try {
        await deleteSeed(gardenId, plotId, seed._id);
        onRefresh();
      } catch (error) {
        console.error("Failed to delete seed:", error);
      }
    }
  };

  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    try {
      await toggleTaskCompletion(gardenId, plotId, seed._id, taskId);
      onRefresh();
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(gardenId, plotId, seed._id, taskId);
      onRefresh();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Bloom animation when seed is complete
  const bloomClass = isComplete ? "bloom-anim" : "";

  return (
    <div className={`seed-card ${bloomClass}`} style={{
      background: "rgba(124, 179, 66, 0.1)",
      borderRadius: "8px",
      padding: "0.75rem",
      border: isComplete ? "1px solid #7cb342" : "1px solid rgba(90, 107, 60, 0.2)"
    }}>
      {/* Seed Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1rem" }}>{isComplete ? "🌸" : "🫘"}</span>
          <span style={{
            fontWeight: "bold",
            fontSize: "0.75rem",
            color: isComplete ? "#7cb342" : "#e8e4d9"
          }}>
            {seed.name}
          </span>
          <span style={{
            fontSize: "0.5625rem",
            opacity: 0.25,
            textTransform: "uppercase"
          }}>
            Seed
          </span>
        </div>
        <button
          onClick={handleDeleteSeed}
          style={{
            padding: "0.25rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "0.75rem",
            color: "#8b8c7a",
            borderRadius: "4px"
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#8b8c7a"}
        >
          🗑️
        </button>
      </div>

      {/* Progress Bar (if there are tasks) */}
      {totalTasks > 0 && (
        <div style={{
          marginBottom: "0.75rem"
        }}>
          <div style={{
            height: "4px",
            background: "#1a1f16",
            borderRadius: "4px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${progressPercentage}%`,
              height: "100%",
              background: "#7cb342",
              transition: "width 0.3s ease"
            }} />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.5625rem",
            color: "rgba(90, 107, 60, 0.7)",
            marginTop: "4px"
          }}>
            <span>{completedTasks}/{totalTasks} tasks</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.5rem" }}>
        {seed.tasks.map((task) => (
          <div key={task._id} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            opacity: task.completed ? 0.6 : 1
          }}>
            <button
              onClick={() => handleToggleTask(task._id, task.completed)}
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: task.completed ? "none" : "2px solid rgba(90, 107, 60, 0.6)",
                background: task.completed ? "#7cb342" : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {task.completed && <span style={{ fontSize: "10px", color: "#1a1f16" }}>✓</span>}
            </button>
            <span style={{
              fontSize: "0.7rem",
              flex: 1,
              textDecoration: task.completed ? "line-through" : "none"
            }}>
              {task.text}
            </span>
            <button
              onClick={() => handleDeleteTask(task._id)}
              style={{
                padding: "0.125rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "0.625rem",
                color: "#8b8c7a",
                opacity: 0,
                transition: "opacity 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
              className="task-delete-btn"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      {!showAddTask ? (
        <button
          onClick={() => setShowAddTask(true)}
          style={{
            width: "100%",
            padding: "0.375rem",
            background: "rgba(124, 179, 66, 0.15)",
            border: "1px dashed rgba(124, 179, 66, 0.3)",
            borderRadius: "6px",
            color: "#7cb342",
            fontSize: "0.65rem",
            cursor: "pointer",
            marginTop: "0.25rem"
          }}
        >
          + Add Task
        </button>
      ) : (
        <div style={{
          marginTop: "0.5rem",
          display: "flex",
          gap: "0.5rem"
        }}>
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="e.g., Write 500 words"
            style={{
              flex: 1,
              padding: "0.375rem",
              background: "#1a1f16",
              border: "1px solid rgba(90, 107, 60, 0.4)",
              borderRadius: "6px",
              color: "#e8e4d9",
              fontSize: "0.7rem"
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
              if (e.key === "Escape") setShowAddTask(false);
            }}
            autoFocus
          />
          <button
            onClick={handleAddTask}
            disabled={isAddingTask}
            style={{
              padding: "0.25rem 0.5rem",
              background: "#7cb342",
              border: "none",
              borderRadius: "6px",
              color: "#1a1f16",
              fontSize: "0.65rem",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {isAddingTask ? "..." : "Add"}
          </button>
          <button
            onClick={() => setShowAddTask(false)}
            style={{
              padding: "0.25rem 0.5rem",
              background: "transparent",
              border: "1px solid rgba(90, 107, 60, 0.4)",
              borderRadius: "6px",
              color: "#e8e4d9",
              fontSize: "0.65rem",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}