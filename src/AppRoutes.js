import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { APIPath, MlsPath, StrictPath } from "../src/CommonMethods/Fetch";
import LandingPage from "./views/ThemeTemplate";
import Themetemplate1 from "./views/ThemeTemplate1";
import Themetemplate2 from "./views/ThemeTemplate2";
import Themetemplate3 from "./views/ThemeTemplate3";
import Themetemplate from "./views/ThemeTemplate";
import AgentViewFlyerActive from "./views/AgentViewFlyer";
import AgentMylisting from "./views/AgentMyListing";
import ThemeTemplate5 from "./views/ThemeTemplate5";
import ThemeTemplate4 from "./views/ThemeTemplate4";
import UniversalTourTheme from "./views/UniversalTourTheme";
var hist = createBrowserHistory();
export default function AppRoutes() {
  return (
    <Router history={hist}>
      <Switch>
        {/* <Route path={APIPath() + "tour-theme/:themeid?/:id?"} exact component={TourTheme} /> */}
        <Route
          path={MlsPath() + ":tourid?"}
          render={(props) => <UniversalTourTheme {...props} mls={true} />}
        />
        <Route
          path={StrictPath() + ":tourid?"}
          render={(props) => <UniversalTourTheme {...props} strict={true} />}
        />
        <Route path={APIPath() + ":tourid?"} component={UniversalTourTheme} />
        <Route
          path={APIPath() + "theme-template/:themeid?/:id?"}
          exact
          component={Themetemplate}
        />
        <Route
          path={APIPath() + "theme-template1/:themeid?/:id?"}
          exact
          component={Themetemplate1}
        />
        <Route
          path={APIPath() + "theme-template2/:themeid?/:id?"}
          exact
          component={Themetemplate2}
        />
        <Route
          path={APIPath() + "theme-template3/:themeid?/:id?"}
          exact
          component={Themetemplate3}
        />
        <Route
          path={APIPath() + "theme-template4/:themeid?/:id?"}
          exact
          component={ThemeTemplate4}
        />
        <Route
          path={APIPath() + "agent-view-flyer-active/:themeid?/:id?"}
          exact
          component={AgentViewFlyerActive}
        />
        <Route
          path={APIPath() + "agent-my-listing/:listingId?/:tourid?"}
          component={AgentMylisting}
        />
        <Route
          path={APIPath() + "theme-template5/:tourid?/:agentid?"}
          component={ThemeTemplate5}
        />
        <Route path={APIPath()} exact component={LandingPage} />
      </Switch>
    </Router>
  );
}
