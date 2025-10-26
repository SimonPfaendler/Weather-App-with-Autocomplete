// src/components/Toggle/toggle.js
import React, { useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.style.backgroundColor = newTheme === "dark" ? "#0b1220" : "#f6f7fb";
    document.body.style.color = newTheme === "dark" ? "#e6eef8" : "#0f172a";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={toggleTheme}
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
