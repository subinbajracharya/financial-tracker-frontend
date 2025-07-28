import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* wrap the main component with user Provider */}
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
