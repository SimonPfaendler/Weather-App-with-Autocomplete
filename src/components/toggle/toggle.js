// src/components/Toggle/toggle.js
import React from "react";

export default function ThemeToggle({ theme, onThemeChange }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={onThemeChange}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: theme === "dark" ? "#4ea8ff" : "#1e90ff",
          color: "white",
          fontSize: "16px",
        }}
      >
        {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <p style={{ marginTop: "20px" }}>
        Aktuelles Theme: <b>{theme}</b>
      </p>
    </div>
  );
}
