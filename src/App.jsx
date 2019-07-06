import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PATHS from './constants/paths';
import LandingPage from './routes/landing-page';
import RepositoryDetails from './routes/repository-details';

function App() {
  return (
    <Router>
      <Route
        path={PATHS.home}
        component={LandingPage}
        exact
      />
      <Route
        path={PATHS.repository}
        component={RepositoryDetails}
      />
    </Router>

  );
}

export default App;
