import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "fontsource-roboto";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => <Login {...props}></Login>} />
        <Route path="/login" render={(props) => <Login {...props}></Login>} />
        <Route
          path="/register"
          render={(props) => <Register {...props}></Register>}
        />
        <ProtectedRoute path="/dashboard" exact component={Dashboard} />
        {/* <ProtectedRoute path="/profile/:username" exact component={Profile} /> */}
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}
