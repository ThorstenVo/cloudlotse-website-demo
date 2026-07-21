import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

window.React = React;
window.ReactDOM = Object.freeze({ createRoot, hydrateRoot });
