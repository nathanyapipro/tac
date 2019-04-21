import React from "react";
import { render } from "react-dom";
import { install } from "@material-ui/styles";
import { initStore } from "./states";
import * as serviceWorker from "./serviceWorker";

install();

(async function() {
  const { store, history } = await initStore();
  const appModule = await import("./App");
  const App = appModule.default;

  render(
    <App store={store} history={history} />,
    document.getElementById("root")
  );
})();

serviceWorker.register();
