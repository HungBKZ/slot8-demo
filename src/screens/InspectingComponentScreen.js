import React, { useState } from "react";

function ChildPropComponent({ label, value }) {
  return (
    <div
      style={{
        marginTop: 14,
        padding: 12,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: "0.95rem", color: "#333" }}>
        Prop <code>{label}</code>: <strong>{value}</strong>
      </div>
    </div>
  );
}

function InspectingComponentScreen() {
  const [color, setColor] = useState("#e0aaff");

  const handleChangeColor = () => {
    setColor(color === "#e0aaff" ? "#ffe5ec" : "#e0aaff");
  };

  return (
    <div>
      <h2>Inspecting Components</h2>
      <p>
        Mở <strong>DevTools</strong> (F12), chọn tab{' '}
        <span style={{ color: "#1976d2" }}>Components</span> để xem cấu trúc cây
        component, props và state.
      </p>
      <div
        style={{
          background: color,
          padding: 24,
          borderRadius: 10,
          textAlign: "center",
          margin: "24px 0",
        }}
      >
        <div style={{ fontSize: "1.2rem", marginBottom: 12 }}>
          State <code>color</code>:{' '}
          <span
            style={{ background: "#fff", padding: "2px 10px", borderRadius: 6 }}
          >
            {color}
          </span>
        </div>
        <button
          onClick={handleChangeColor}
          style={{
            background: "#b8b8f8",
            color: "#333",
            border: "none",
            borderRadius: 6,
            padding: "8px 18px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Đổi màu background
        </button>

        {/* Child component to demonstrate props inspection in DevTools */}
        <ChildPropComponent label="exampleProp" value={color} />
      </div>
      <ol>
        <li>
          Chọn component <code>InspectingComponentScreen</code> hoặc{' '}
          <code>ChildPropComponent</code> trong DevTools.
        </li>
        <li>
          Xem giá trị state <strong>color</strong> và prop <strong>exampleProp</strong>.
        </li>
        <li>Có thể edit props/state trực tiếp để thử (DevTools).</li>
      </ol>
    </div>
  );
}

export default InspectingComponentScreen;
