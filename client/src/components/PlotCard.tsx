import React, { useState } from "react";
import SeedCard from "./SeedCard";
import { addSeedToPlot, deletePlot } from "../api/api";
import { Trash2, Plus } from "lucide-react";

interface PlotCardProps {
  gardenId: string;
  plot: {
    _id: string;
    name: string;
    seeds: Array<{
      _id: string;
      name: string;
      tasks: Array<{
        _id: string;
        text: string;
        completed: boolean;
      }>;
    }>;
  };
  onRefresh: () => void;
}

export default function PlotCard({ gardenId, plot, onRefresh }: PlotCardProps) {
  const [showAddSeed, setShowAddSeed] = useState(false);
  const [newSeedName, setNewSeedName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSeed = async () => {
    if (!newSeedName.trim()) return;
    setIsAdding(true);
    try {
      await addSeedToPlot(gardenId, plot._id, { name: newSeedName });
      setNewSeedName("");
      setShowAddSeed(false);
      onRefresh();
    } catch (error) {
      console.error("Failed to add seed:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeletePlot = async () => {
    if (confirm(`Delete plot "${plot.name}" and all its seeds?`)) {
      try {
        await deletePlot(gardenId, plot._id);
        onRefresh();
      } catch (error) {
        console.error("Failed to delete plot:", error);
      }
    }
  };

  return (
    <div className="plot-card" style={{
      background: "rgba(37, 43, 31, 0.5)",
      borderRadius: "12px",
      padding: "1rem",
      marginBottom: "1rem",
      border: "1px solid rgba(90, 107, 60, 0.2)"
    }}>
      {/* Plot Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.75rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🌱</span>
          <h3 style={{
            fontWeight: "bold",
            fontSize: "0.875rem",
            color: "#7cb342",
            margin: 0
          }}>
            {plot.name}
          </h3>
          <span style={{
            fontSize: "0.625rem",
            opacity: 0.3,
            textTransform: "uppercase"
          }}>
            Plot
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setShowAddSeed(!showAddSeed)}
            style={{
              padding: "0.25rem 0.5rem",
              background: "rgba(124, 179, 66, 0.2)",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.75rem",
              color: "#7cb342"
            }}
          >
            <Plus size={14} style={{ display: "inline", marginRight: "4px" }} />
            Seed
          </button>
          <button
            onClick={handleDeletePlot}
            style={{
              padding: "0.25rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#8b8c7a",
              borderRadius: "4px"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#8b8c7a"}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Add Seed Form */}
      {showAddSeed && (
        <div style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          background: "rgba(26, 31, 22, 0.6)",
          borderRadius: "8px"
        }}>
          <input
            type="text"
            value={newSeedName}
            onChange={(e) => setNewSeedName(e.target.value)}
            placeholder="Seed name (e.g., Strengthen LinkedIn)"
            style={{
              width: "100%",
              padding: "0.5rem",
              background: "#1a1f16",
              border: "1px solid rgba(90, 107, 60, 0.4)",
              borderRadius: "6px",
              color: "#e8e4d9",
              fontSize: "0.75rem",
              marginBottom: "0.5rem"
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSeed();
              if (e.key === "Escape") setShowAddSeed(false);
            }}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handleAddSeed}
              disabled={isAdding}
              style={{
                padding: "0.25rem 0.75rem",
                background: "#7cb342",
                border: "none",
                borderRadius: "6px",
                color: "#1a1f16",
                fontSize: "0.7rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {isAdding ? "Adding..." : "Add Seed"}
            </button>
            <button
              onClick={() => setShowAddSeed(false)}
              style={{
                padding: "0.25rem 0.75rem",
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

      {/* Seeds List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {plot.seeds && plot.seeds.length > 0 ? (
          plot.seeds.map((seed) => (
            <SeedCard
              key={seed._id}
              gardenId={gardenId}
              plotId={plot._id}
              seed={seed}
              onRefresh={onRefresh}
            />
          ))
        ) : (
          <p style={{
            fontSize: "0.7rem",
            color: "rgba(90, 107, 60, 0.6)",
            fontStyle: "italic",
            textAlign: "center",
            margin: "0.5rem 0"
          }}>
            No seeds yet – add one to start growing!
          </p>
        )}
      </div>
    </div>
  );
}
