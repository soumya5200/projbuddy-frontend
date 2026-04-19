import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("codeData"));
    setData(saved);
  }, []);

  if (!data) {
    return <h2 style={{ color: "white", textAlign: "center" }}>No Data Found</h2>;
  }

  const lines = data.code.split("\n").length;

  // 🧠 SMART AI SCORE
  const score = Math.min(100,
    (lines * 2) +
    (data.code.includes("function") ? 10 : 0) +
    (data.code.includes("map") ? 10 : 0)
  );

  // 📊 CHART DATA
  const chartData = [
    { name: "Mon", lines: lines - 15 },
    { name: "Tue", lines: lines - 10 },
    { name: "Wed", lines: lines - 5 },
    { name: "Thu", lines: lines },
    { name: "Fri", lines: lines + 10 },
  ];

  // 🔥 HEATMAP (GitHub style)
  const heatmap = Array.from({ length: 35 }, () =>
    Math.floor(Math.random() * 4)
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "white",
      padding: "30px"
    }}>

      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        🚀 Ultimate Analytics
      </h1>

      {/* CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        <Card title="Lines" value={lines} color="#22c55e" />
        <Card title="Characters" value={data.code.length} color="#3b82f6" />
        <Card title="AI Score" value={`${score}/100`} color="#f59e0b" />
        <Card title="Updated" value={data.lastUpdated} color="#a855f7" />
      </div>

      {/* CHART */}
      <div style={{
        marginTop: "40px",
        background: "#0f172a",
        padding: "20px",
        borderRadius: "12px"
      }}>
        <h3>📊 Activity</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="lines" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 HEATMAP */}
      <div style={{ marginTop: "40px" }}>
        <h3>🔥 Contribution Heatmap</h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
          marginTop: "10px"
        }}>
          {heatmap.map((val, i) => (
            <div key={i} style={{
              width: "100%",
              height: "20px",
              background:
                val === 0 ? "#1e293b" :
                val === 1 ? "#4ade80" :
                val === 2 ? "#22c55e" :
                "#15803d",
              borderRadius: "4px"
            }}></div>
          ))}
        </div>
      </div>

      {/* PROGRESS */}
      <div style={{ marginTop: "40px" }}>
        <h3>🚀 Progress</h3>
        <div style={{
          width: "100%",
          height: "12px",
          background: "#1e293b",
          borderRadius: "10px"
        }}>
          <div style={{
            width: `${Math.min(lines * 3, 100)}%`,
            height: "100%",
            background: "#22c55e",
            borderRadius: "10px",
            transition: "0.4s"
          }}></div>
        </div>
      </div>

      {/* AI TIP */}
      <div style={{
        marginTop: "30px",
        color: "#94a3b8",
        fontSize: "14px"
      }}>
        💡 Tip: Add functions, loops, and reusable components to boost your AI score!
      </div>

    </div>
  );
};

// 🔥 CARD COMPONENT WITH HOVER
const Card = ({ title, value, color }) => (
  <div
    style={{
      background: "#0f172a",
      padding: "20px",
      borderRadius: "12px",
      borderLeft: `5px solid ${color}`,
      transition: "0.3s",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
  >
    <h4 style={{ color: "#94a3b8" }}>{title}</h4>
    <h2>{value}</h2>
  </div>
);

export default Analytics;