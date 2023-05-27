import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Test from './components/test/Test';
import Test2 from './components/test/test2';
import Register from './components/register/Register'
import Career from './components/career/Career'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/prediccion" component={Test} />
        <Route path="/predicciontwo" component={Test2} />
        <Route path="/users" component={Register} />
        <Route path="/careers" component={Career} />
      </Switch>
    </Router>
  );
}


export default App;
