import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from './main/App';
import PersonProfile from './person-profile/PersonProfile';

export default function AppRouter() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/:personName">
                <PersonProfile />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }