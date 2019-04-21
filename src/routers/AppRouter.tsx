import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Home = React.lazy(() => import("../pages/Home"));
const Result = React.lazy(() => import("../pages/Result"));

function AppRouter() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/result" exact component={Result} />
        <Redirect to="/" />
      </Switch>
    </AppLayout>
  );
}

export default AppRouter;
