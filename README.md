# SLOT8 - Demo React DevTools

Demo gồm 3 phần trong 1 dự án React: **Inspecting Components**, **Using Context API**, **Performance Profiling**. Tất cả nằm trong App.js với menu nút bấm để chuyển màn hình.

---

## 1) Chuẩn bị môi trường

- Cài **Node.js LTS (>= 18)**
- Cài **Visual Studio Code** (khuyên dùng để tích hợp React DevTools)
- Cài **Chrome** hoặc **Edge** (cài extension [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi))
- Tuỳ chọn: sử dụng trình duyệt khác có hỗ trợ extension DevTools

---

## 2) Tạo dự án mới bằng npx (template blank)

```bash
npx create-react-app slot8-react-devtools-demo --template blank
cd slot8-react-devtools-demo
npm start
```
> **Lưu ý:** Nếu `--template blank` báo lỗi, hãy dùng mặc định:
> ```bash
> npx create-react-app slot8-react-devtools-demo
> ```

Trình duyệt sẽ tự mở: http://localhost:3000

---

## 3) Dán code demo

- Mở file `src/App.js`
- Xoá nội dung mặc định và dán toàn bộ nội dung App.js từ dự án này (menu + 3 màn hình demo)
- Tạo thêm thư mục `src/screens/` và thêm 3 file tương ứng bên dưới:
  - `InspectingComponentScreen.js`
  - `ContextApiScreen.js`
  - `PerformanceProfilingScreen.js`
- Lưu file, trình duyệt sẽ tự reload.

---

## 4) Nội dung từng màn hình

### Inspecting Components

- Minh hoạ cách mở React DevTools, xem props/state, cấu trúc cây component.
- Có nút đổi màu để thấy state thay đổi ngay trong DevTools.
- Hướng dẫn thao tác trực tiếp.

### Using Context API

- Minh hoạ Context API: tạo ThemeContext để truyền theme xuống nhiều component con.
- Có nút chuyển theme (light/dark), kiểm tra giá trị context qua DevTools.
- Hướng dẫn xem giá trị context.

### Performance Profiling

- Minh hoạ cách dùng tab Profiler của React DevTools.
- Có list với nút thêm item, đo thời gian render và xem components nào bị re-render.
- Hướng dẫn thao tác đo hiệu năng.

---

## 5) Chạy demo trong repo này

```bash
npm install
npm start
```

Mở trên trình duyệt, dùng menu để chuyển qua các màn hình.

---

## 6) Lưu ý

- Để dùng React DevTools: mở trình duyệt, nhấn F12, chuyển sang tab **Components** hoặc **Profiler**.
- Có thể xem props/state, context, hiệu năng render.
- Khi test Profiler: nhấn nút "Start profiling", thao tác trên app, sau đó nhấn "Stop profiling" để xem kết quả.
- Nếu chưa thấy tab **Components**/**Profiler**, hãy kiểm tra lại extension React Developer Tools đã cài chưa.

---

## 7) Giải thích chi tiết các file chính

Dưới đây là mô tả các file quan trọng trong project và những phần cần chú ý khi demo với React DevTools.

### `src/index.js`

Vai trò: điểm khởi động (entry) của ứng dụng. File này khởi tạo React root và mount `App` vào DOM.

Chi tiết:
- Sử dụng API `createRoot` (React 18+) để mount app:
  - Tốt hơn `ReactDOM.render` cũ, tương thích với concurrent features.

### `src/App.js`

Vai trò: giao diện chính chứa menu để chuyển giữa 3 màn hình demo (Inspect / Context / Profiling).

Chi tiết:
- Import 3 màn hình từ `src/screens/*`.
- Định nghĩa mảng `MENU` gồm { key, label, component } để render các nút menu.
- Sử dụng state `currentScreenKey` để biết màn hình hiện tại. Nếu `null` hiển thị menu; nếu có key, render component tương ứng.
- Có nút "Back to Menu" để quay lại.

### `src/screens/InspectingComponentScreen.js`

Vai trò: demo cách dùng React DevTools để inspect component, xem state và props.

Chi tiết:
- Có state `color` và nút "Đổi màu background" để trigger re-render.
- Thêm `ChildPropComponent` (con) nhận prop `exampleProp` để minh họa cách DevTools hiển thị props.
- Khi bấm nút, thay đổi state sẽ hiển thị ngay trong tab Components của React DevTools — bạn có thể mở tree, chọn `InspectingComponentScreen` hoặc `ChildPropComponent` và xem giá trị state/props.

Ví dụ kiểm tra trong DevTools: chọn component -> mục "props" và "state" sẽ hiển thị giá trị hiện tại.

### `src/screens/ContextApiScreen.js`

Vai trò: demo Context API và cách inspect giá trị context trong DevTools.

Chi tiết:
- Tạo `ThemeContext` bằng `createContext` và cung cấp giá trị thông qua `ThemeContext.Provider`.
- Có state `theme` (light/dark) và nút đổi theme.
- `ThemeChildComponent` sử dụng `useContext(ThemeContext)` để nhận giá trị và render giao diện tương ứng.

Kiểm tra trong DevTools: chọn `ThemeChildComponent` để xem giá trị context hiện tại (React DevTools hiển thị `context` khi component dùng Context API).

### `src/screens/PerformanceProfilingScreen.js`

Vai trò: demo tab Profiler của React DevTools — đo thời gian render và tìm component tốn chi phí.

Chi tiết:
- Có state `items` (mảng) và nút "Thêm item" để khiến app re-render.
- Thêm một component mô phỏng render nặng `HeavyComponent`:
  - `HeavyComponent` thực hiện một vòng lặp tính toán lớn (simulated CPU work) để tạo ra chi phí render có thể thấy được trong Profiler.
  - `MemoizedHeavy` là phiên bản `React.memo(HeavyComponent)` để minh họa cách memoization giúp tránh re-render không cần thiết.
- Có checkbox "Show heavy component" để bật / tắt component nặng, giúp so sánh chi phí render khi thêm item.

Hướng dẫn khi demo Profiler:
- Mở tab Profiler, nhấn "Start profiling".
- Thực hiện thao tác (ví dụ: bấm "Thêm item" hoặc bật/tắt heavy component), sau đó "Stop profiling" để xem breakdown thời gian render theo component.

### Các file cấu hình và phụ trợ

- `package.json`: chứa dependencies (react, react-dom, react-scripts) và script `npm start`.
- `public/index.html`: template HTML có phần tử `<div id="root"></div>` để React mount vào.

---

Gợi ý nhỏ để demo mượt hơn
- Mở DevTools trước khi tải trang (F12) để React DevTools dễ detect hook.
- Nếu không thấy tab Components/Profiler: kiểm tra extension có bật không, hoặc trang có đang chạy trong iframe không (cross-origin iframe sẽ chặn).

Phần này đã mô tả rõ các file và những điểm bạn nên chú ý khi demo React DevTools.
---

## 8) Hướng dẫn thao tác React DevTools

- **Inspecting Components:**  
  Mở tab **Components**, chọn component, xem props/state, thử bấm nút đổi màu để thấy state thay đổi realtime.

- **Using Context API:**  
  Chọn component con, kiểm tra context value, thử đổi theme để quan sát giá trị context thay đổi.

- **Performance Profiling:**  
  Mở tab **Profiler**, nhấn "Start profiling", thực hiện thao tác thêm item, nhấn "Stop profiling" để xem biểu đồ render và kiểm tra components bị re-render.

---

**Chúc bạn thuận lợi!**