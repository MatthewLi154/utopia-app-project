import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import ProfileProvider from "./context/profileContext";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProfileProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ProfileProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
