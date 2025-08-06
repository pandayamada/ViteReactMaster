import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import ReactDOM from "react-dom/client";
// import store from "./redux/store";
import { Provider } from "react-redux";
import "./core/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <Provider store={store}>
  <>
    <RouterProvider router={routes} />
  </>
  // </Provider>
);
