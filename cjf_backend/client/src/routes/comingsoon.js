import React from "react";
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";
import AdminLogin from "../components/Admin/AdminLogin/AdminLogin";
import Dashboard from "../components/Admin/Dashboard";
import { ComingSoonPage } from "../components/Coming Soon/ComingSoonPage";

export const ComingSoonRouter = (props) => {
  return (
    <BRouter>
      <Switch>
        <Route
          exact
          path="/admin"
          component={AdminLogin}
          history={props.history}
        />
        <Route
          path="/dashboard"
          component={Dashboard}
          history={props.history}
        />
        <Route path="/" component={ComingSoonPage} history={props.history} />
      </Switch>
    </BRouter>
  );
};
