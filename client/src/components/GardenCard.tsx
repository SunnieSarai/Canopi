import React, { useState } from "react";
import PlotCard from "./PlotCard";
import { addPlot, deleteGarden } from "../api/api";

type Task = { _id: string; text: string; completed: boolean };
type Seed = { _id: string; name: string; tasks: Task[] };
type Plot = { _id: string; name: string; seeds: Seed[] };
type Garden = { _id: string; name: string; location?: string; plots: Plot[] };

export default function GardenCard({ garden, onRefresh }: { garden: Garden; onRefresh?: () => void }) {
  const [showAddPlot, setShowAddPlot] = useState(false);
  const [newPlotName, setNewPlotName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddPlot = async () => {
    if (!newPlotName.trim()) return;
    setIsAdding(true);
    try {
      await addPlot(garden._id, { name: newPlotName.trim() });
      setNewPlotName("");
      setShowAddPlot(false);
      onRefresh?.();
    } catch (e) {
      console.error(e);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteGarden = async () => {
    if (confirm(`Delete garden "${garden.name}" and everything inside it?`)) {
      try {
        await deleteGarden(garden._id);
        onRefresh?.();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="garden-card" style={{
      background: "#252b1f",
      borderRadius: "16px",
      padding: "1.25rem",
      marginBottom: "1.5rem",
      borderLeft: "4px solid #7cb342"
    }}>
      {/* Garden Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.5rem" }}>🏡</span>
          <div>
            <h2 style={{
              fontSize: "1.25rem",
              color: "#7cb342",
              margin: 0,
              fontFamily: "'DM Serif Display', serif"
            }}>
              {garden.name}
            </h2>
            {garden.location && (
              <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>{garden.location}</span>
            )}
          </div>
          <span style={{
            fontSize: "0.65rem",
            opacity: 0.4,
            textTransform: "uppercase"
          }}>
            Garden
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setShowAddPlot(!showAddPlot)}
            style={{
              padding: "0.375rem 0.75rem",
              background: "rgba(124, 179, 66, 0.2)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.75rem",
              color: "#7cb342",
              fontWeight: "bold"
            }}
          >
            + Plot
          </button>
          <button
            onClick={handleDeleteGarden}
            style={{
              padding: "0.375rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#8b8c7a",
              borderRadius: "6px"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#8b8c7a"}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Add Plot Form */}
      {showAddPlot && (
        <div style={{
          marginBottom: "1rem",
          padding: "0.75rem",
          background: "rgba(26, 31, 22, 0.6)",
          borderRadius: "12px"
        }}>
          <input
            type="text"
            value={newPlotName}
            onChange={(e) => setNewPlotName(e.target.value)}
            placeholder="Plot name (e.g., Land a Job, Write a Book)"
            style={{
              width: "100%",
              padding: "0.5rem",
              background: "#1a1f16",
              border: "1px solid rgba(90, 107, 60, 0.4)",
              borderRadius: "8px",
              color: "#e8e4d9",
              fontSize: "0.75rem",
              marginBottom: "0.5rem"
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddPlot();
              if (e.key === "Escape") setShowAddPlot(false);
            }}
            autoFocus
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handleAddPlot}
              disabled={isAdding}
              style={{
                padding: "0.375rem 0.75rem",
                background: "#7cb342",
                border: "none",
                borderRadius: "6px",
                color: "#1a1f16",
                fontSize: "0.7rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {isAdding ? "Adding..." : "Add Plot"}
            </button>
            <button
              onClick={() => setShowAddPlot(false)}
              style={{
                padding: "0.375rem 0.75rem",
                background: "transparent",
                border: "1px solid rgba(90, 107, 60, 0.4)",
                borderRadius: "6px",
                color: "#e8e4d9",
                fontSize: "0.7rem",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Plots List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {garden.plots && garden.plots.length > 0 ? (
          garden.plots.map((plot) => (
            <PlotCard
              key={plot._id}
              gardenId={garden._id}
              plot={plot}
              onRefresh={onRefresh || (() => {})}
            />
          ))
        ) : (
          <p style={{
            fontSize: "0.75rem",
            color: "rgba(90, 107, 60, 0.6)",
            fontStyle: "italic",
            textAlign: "center",
            padding: "1rem"
          }}>
            No plots yet – add one to start planning!
          </p>
        )}
      </div>
    </div>
  );
}