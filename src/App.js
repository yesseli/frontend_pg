import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Test from './components/test/Test';
import Register from './components/register/Register'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/prediccion" component={Test} />
        <Route path="/users" component={Register} />
      </Switch>
    </Router>
  );
}


export default App;
