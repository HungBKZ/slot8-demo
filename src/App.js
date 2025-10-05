import React, { useState } from "react";
import InspectingComponentScreen from "./screens/InspectingComponentScreen";
import ContextApiScreen from "./screens/ContextApiScreen";
import PerformanceProfilingScreen from "./screens/PerformanceProfilingScreen";

/*
  App.js - Điểm vào của ứng dụng demo React DevTools

  Mục đích:
  - Hiển thị menu để chuyển giữa 3 màn hình demo:
    1) Inspecting Components
    2) Using Context API
    3) Performance Profiling

  Cấu trúc dữ liệu chính:
  - MENU: mảng chứa object { key, label, component } dùng để render nút menu.
  - currentScreenKey: state (null hoặc key) quyết định màn hình đang hiển thị.

  Hành vi chính:
  - Nếu currentScreenKey === null -> hiển thị menu.
  - Nếu có key -> tìm component tương ứng trong MENU và render nó (kèm nút Back).

  Ghi chú:
  - Mỗi màn hình demo nằm trong thư mục `src/screens/` và export default component.
  - Styles được định nghĩa ở cuối file để tập trung phần giao diện.
*/

const MENU = [
  {
    key: "inspect",
    label: "Inspecting Components",
    component: InspectingComponentScreen,
  },
  { key: "context", label: "Using Context API", component: ContextApiScreen },
  {
    key: "profiling",
    label: "Performance Profiling",
    component: PerformanceProfilingScreen,
  },
];

function App() {
  const [currentScreenKey, setCurrentScreenKey] = useState(null);

  if (currentScreenKey) {
    const CurrentScreen = MENU.find(
      (m) => m.key === currentScreenKey
    ).component;
    return (
      <div style={styles.screenContainer}>
        <button
          style={styles.backButton}
          onClick={() => setCurrentScreenKey(null)}
        >
          ← Back to Menu
        </button>
        <CurrentScreen />
      </div>
    );
  }

  return (
    <div style={styles.menuContainer}>
      <h1>SLOT7 - Demo React DevTools</h1>
      {MENU.map((item) => (
        <button
          key={item.key}
          style={styles.menuButton}
          onClick={() => setCurrentScreenKey(item.key)}
        >
          {item.label}
        </button>
      ))}
      <div style={styles.note}>
        <strong>Tip:</strong> Nhấn F12 để mở DevTools, chọn tab{" "}
        <span style={{ color: "#1976d2" }}>Components</span> hoặc{" "}
        <span style={{ color: "#1976d2" }}>Profiler</span>.
      </div>
    </div>
  );
}

const styles = {
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 48,
    fontFamily: "sans-serif",
  },
  menuButton: {
    padding: "12px 32px",
    margin: "12px",
    fontSize: "1rem",
    background: "#ececec",
    border: "1px solid #bbb",
    borderRadius: 8,
    cursor: "pointer",
  },
  screenContainer: {
    maxWidth: 600,
    margin: "36px auto",
    padding: "24px",
    boxShadow: "0 2px 16px #ddd",
    borderRadius: 12,
    fontFamily: "sans-serif",
  },
  backButton: {
    marginBottom: 16,
    padding: "6px 18px",
    fontSize: "0.97rem",
    background: "#f8f8f8",
    border: "1px solid #bbb",
    borderRadius: 6,
    cursor: "pointer",
  },
  note: {
    marginTop: 32,
    background: "#f3f8fc",
    padding: "14px 18px",
    borderRadius: 8,
    fontSize: "0.95rem",
    color: "#333",
  },
};

export default App;
