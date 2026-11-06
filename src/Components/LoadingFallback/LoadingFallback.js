import React from "react";

const LoadingFallback = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: "1rem",
        color: "#6b7280",
      }}
      aria-label="Loading page..."
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid #e5e7eb",
          borderTopColor: "#1976d2",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 500 }}>
        Loading content...
      </p>
    </div>
  );
};

export default LoadingFallback;
