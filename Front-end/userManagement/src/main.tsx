import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css"
import RootStore from "./redux/store.ts";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
      <Provider store={RootStore}>
        <App />
      </Provider>
  </BrowserRouter>
);
