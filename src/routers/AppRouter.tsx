import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Home = React.lazy(() => import("../pages/Home"));
const Results = React.lazy(() => import("../pages/Results"));

function AppRouter() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/results" exact component={Results} />
        <Redirect to="/" />
      </Switch>
    </AppLayout>
  );
}

export default AppRouter;
