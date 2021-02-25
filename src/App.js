import React from 'react';
import ScrollToTop from './components/scrollToTop';

// Styles
import './assets/sass/app.sass';

// Paginas
import Home from './pages/home';
import Single from './pages/single';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:slug">
          <ScrollToTop />
          <Single />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
