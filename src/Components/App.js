import React from 'react';
import Canvas from './Canvas';
import Nav from './Nav';
import Leaderboard from './Leaderboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../index.css';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/photo-tag">
            <Canvas />
          </Route>
          <Route path="/leaderboards">
            <Leaderboard />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
