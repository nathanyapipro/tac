import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist";
import { Store } from "redux";
import { Provider } from "react-redux";
import withTheme from "./components/withTheme";
import { StoreState } from "./states";
import { History } from "history";
import AppRouter from "./routers/AppRouter";
import Loading from "./components/Loading";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  "@global": {
    html: {
      display: "flex",
      height: "100%",
      flex: "1 1 auto"
    },
    body: {
      display: "flex",
      flex: "1 1 auto"
    },
    "#root": {
      display: "flex",
      flex: "1 1 auto"
    },
    a: {
      color: "inherit",
      textDecoration: "inherit"
    }
  }
}));

interface AppProps {
  store: Store<StoreState>;
  history: History;
  persistor: Persistor;
}

type Props = AppProps;

function AppBase({ store, history, persistor }: Props) {
  useStyles();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.Suspense fallback={<Loading />}>
          <ConnectedRouter history={history}>
            <AppRouter />
          </ConnectedRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}

const App = withTheme(AppBase);

export default App;
