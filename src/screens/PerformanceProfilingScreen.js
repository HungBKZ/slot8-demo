import React, { useState, useMemo } from "react";

/*
  PerformanceProfilingScreen.js

  Mục đích:
  - Minh hoạ cách dùng React DevTools Profiler để đo thời gian render và xác
    định component tốn tài nguyên.
  - Cung cấp một component "nặng" (HeavyComponent) để dễ thấy chi phí render.

  Các phần chính:
  - HeavyComponent: mô phỏng công việc nặng bằng vòng lặp CPU.
  - MemoizedHeavy: phiên bản memoized (React.memo) của HeavyComponent để
    minh hoạ cách tránh re-render không cần thiết.
  - items + Thêm item: danh sách mô phỏng thao tác người dùng gây re-render.

  Cách demo:
  - Mở DevTools → Profiler, Start profiling, tương tác (Thêm item / bật tắt heavy),
    Stop và kiểm tra component nào mất nhiều thời gian.
*/
// Simulate a heavy render by running a CPU-bound loop
function HeavyComponent({ label, iterations = 2000000 }) {
  // heavy calculation
  const result = useMemo(() => {
    let s = 0;
    for (let i = 0; i < iterations; i++) s += i % 3;
    return s;
  }, [iterations]);

  return (
    <div
      style={{
        marginTop: 12,
        padding: 12,
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <strong>{label}</strong> (heavy calc result: {result})
    </div>
  );
}

const MemoizedHeavy = React.memo(HeavyComponent);

function PerformanceProfilingScreen() {
  const [items, setItems] = useState(
    Array.from({ length: 5 }, (_, i) => `Item #${i + 1}`)
  );
  const [showHeavy, setShowHeavy] = useState(true);

  const addItem = () => {
    setItems((prev) => [...prev, `Item #${prev.length + 1}`]);
  };

  return (
    <div>
      <h2>Performance Profiling</h2>
      <p>
        Dùng tab <strong>Profiler</strong> trong React DevTools để đo hiệu năng
        render của component.
      </p>
      <div
        style={{
          background: "#f8f8fa",
          padding: 22,
          borderRadius: 10,
          margin: "24px 0",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={addItem}
            style={{
              background: "#caf0f8",
              color: "#222",
              border: "none",
              borderRadius: 6,
              padding: "8px 18px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Thêm item
          </button>
          <label style={{ fontSize: "0.95rem" }}>
            <input
              type="checkbox"
              checked={showHeavy}
              onChange={(e) => setShowHeavy(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Show heavy component
          </label>
        </div>

        {showHeavy ? (
          // Memoized heavy component demonstrates preventing unnecessary re-renders
          <MemoizedHeavy label="Heavy Component (memoized)" />
        ) : null}

        <ul style={{ marginTop: 12 }}>
          {items.map((item) => (
            <li
              key={item}
              style={{
                marginBottom: 8,
                padding: "6px 12px",
                background: "#fff",
                borderRadius: 6,
                boxShadow: "0 1px 4px #e0e0e0",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <ol>
        <li>
          Mở tab <strong>Profiler</strong> trong DevTools (nếu chưa thấy, cài
          extension React DevTools).
        </li>
        <li>Nhấn "Start profiling", sau đó bấm nút Thêm item (và thử bật/tắt heavy component).</li>
        <li>Quan sát biểu đồ render và kiểm tra component nào chịu chi phí render cao.</li>
      </ol>
    </div>
  );
}

export default PerformanceProfilingScreen;
