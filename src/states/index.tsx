import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
  StoreEnhancer
} from "redux";
import {
  connectRouter,
  RouterState,
  routerMiddleware,
  CallHistoryMethodAction
} from "connected-react-router";
import { persistReducer, persistStore, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { History, createBrowserHistory } from "history";
import { ActionType } from "typesafe-actions";
import { global, GlobalState } from "./global/reducer";
import { actions as globalActions } from "./global/actions";

declare global {
  interface Window {
    env: { [key: string]: string };
    BroadcastChannel: BroadcastChannel;
  }
}

export type Actions = ActionType<
  typeof globalActions | CallHistoryMethodAction
>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export interface StoreState {
  router: RouterState;
  global: GlobalState;
}

interface InitStore {
  store: Store<StoreState>;
  history: History;
  persistor: Persistor;
}

const publicURL = process.env.PUBLIC_URL;

export async function initStore(): Promise<InitStore> {
  const history = createBrowserHistory({
    basename: publicURL
  });

  const enhancers: Array<StoreEnhancer> = [];
  const middlewares = [routerMiddleware(history)];

  if (
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const rootReducer = combineReducers({
    router: connectRouter(history),
    global
  });

  const store = createStore(
    persistReducer(
      {
        key: "tac-antibio",
        storage,
        whitelist: ["global"]
      },
      rootReducer
    ),

    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  const persistor = persistStore(store);
  await persistor.flush();

  return {
    store,
    history,
    persistor
  };
}
