import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import AppWithContext from "./AppWithContext";
import { FlowProvider } from "./FlowContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlowProvider>
      <AppWithContext />
    </FlowProvider>
    {/* <App /> */}
  </StrictMode>
);
