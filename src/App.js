import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/Home';
import Test from './components/Test';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/prediccion" component={Test} />
      </Switch>
    </Router>
  );
}


export default App;
