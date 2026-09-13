import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ContextProvider } from "./Context";
import "./i18n.cjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>,
);
