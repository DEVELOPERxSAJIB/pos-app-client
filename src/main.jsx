import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyleProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </StyleProvider>
  </React.StrictMode>
);
