import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
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
}

type Props = AppProps;

function AppBase({ store, history }: Props) {
  useStyles();
  return (
    <Provider store={store}>
      <React.Suspense fallback={<Loading />}>
        <ConnectedRouter history={history}>
          <AppRouter />
        </ConnectedRouter>
      </React.Suspense>
    </Provider>
  );
}

const App = withTheme(AppBase);

export default App;
