import React from 'react'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
// import User from './components/user.component';
import Home from './components/Home';
import Login from './auth/Login';
import SignUp from './auth/SignUp';

function App() {

  return (
    <div>
    <BrowserRouter>
        <div className="header">
            <NavLink className="nav-link" exact activeClassName="active" to="/">LANDING PAGE</NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/home">Home</NavLink>
            <NavLink className="nav-link " onlyActiveOnIndex  activeClassName="active" to="/login">Login <small>Access without token only</small></NavLink>
            <NavLink className="nav-link" onlyActiveOnIndex activeClassName="active" to="/signup">Sign up <small>Access with token only</small></NavLink>
        </div>
        <div className="content">
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </div>
    </BrowserRouter>
</div>
  );
}

export default App;
