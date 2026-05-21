import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { setBaseUrl } from "@workspace/api-client-react";

// Initialize API base URL for backend calls
const apiUrl = import.meta.env.VITE_API_URL || window.location.origin.replace(/(:\d+)?$/, ":5000");
setBaseUrl(apiUrl);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);