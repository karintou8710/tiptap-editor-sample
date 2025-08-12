import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "ress";
import "tippy.js/themes/light.css";
import "./index.css";

import "@fontsource/noto-sans-jp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
