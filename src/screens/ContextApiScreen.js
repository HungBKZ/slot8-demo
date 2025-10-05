import React, { useState, useContext, createContext } from "react";

/*
  ContextApiScreen.js

  Mục đích:
  - Minh hoạ cách tạo và sử dụng Context API (ví dụ: ThemeContext) để chia sẻ
    dữ liệu giữa các component mà không cần truyền props qua nhiều cấp.

  Các phần chính:
  - ThemeContext: context chứa giá trị theme (light/dark).
  - ContextApiScreen: provider cho context và nút chuyển theme.
  - ThemeChildComponent: component con dùng useContext để đọc giá trị context.

  Cách demo với DevTools:
  - Mở tab Components -> chọn `ThemeChildComponent` hoặc component sử dụng
    context để xem giá trị `context` trong panel của React DevTools.
*/
// Tạo context cho theme (giá trị mặc định: "light")
const ThemeContext = createContext("light");

function ContextApiScreen() {
  // state quản lý theme hiện tại (light | dark)
  const [theme, setTheme] = useState("light");

  // đổi theme khi bấm nút
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={theme}>
      <h2>Using Context API</h2>
      <p>
        Dùng <strong>Context API</strong> để chia sẻ dữ liệu (ví dụ: theme) giữa
        các component mà không cần truyền props qua nhiều cấp.
      </p>
      <div
        style={{
          margin: "24px 0",
          padding: 22,
          background: theme === "light" ? "#f8f9fa" : "#22223b",
          color: theme === "light" ? "#333" : "#f8f8f8",
          borderRadius: 10,
        }}
      >
        <div style={{ marginBottom: 12, fontSize: "1.1rem" }}>
          Theme hiện tại: <span style={{ fontWeight: 600 }}>{theme}</span>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            background: theme === "light" ? "#d1e7dd" : "#4a4e69",
            color: theme === "light" ? "#222" : "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 18px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Đổi theme
        </button>
        <ThemeChildComponent />
      </div>
      <ol>
        <li>
          Mở tab <strong>Components</strong> của DevTools, chọn{' '}
          <code>ThemeChildComponent</code> để xem giá trị context.
        </li>
        <li>Đổi theme và quan sát context value thay đổi trong DevTools.</li>
      </ol>
    </ThemeContext.Provider>
  );
}

// Component con dùng context
function ThemeChildComponent() {
  // đọc giá trị theme từ context
  const theme = useContext(ThemeContext);
  return (
    <div
      style={{
        marginTop: 18,
        padding: 14,
        background: theme === "light" ? "#e2eafc" : "#232946",
        color: theme === "light" ? "#222" : "#fff",
        borderRadius: 6,
      }}
    >
      <span role="img" aria-label="theme" style={{ marginRight: 8 }}>
        💡
      </span>
      Đây là component con nhận theme từ Context: <strong>{theme}</strong>
    </div>
  );
}

export default ContextApiScreen;
