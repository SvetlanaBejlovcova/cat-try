import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf";

createRoot(document.getElementById("root")).render(<App />);
