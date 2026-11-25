import "./styles/keyup.css";
import App from "./App";
import { hydrateRoot } from "react-dom/client";
import * as React from "react";

const container = document.getElementById("root");
if (container) {
  hydrateRoot(container, <React.StrictMode><App /></React.StrictMode>);
} else {
  console.error("Root container not found");
}