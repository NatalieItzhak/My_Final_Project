import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from '../src/components/Login';
import SignIn from './components/SignIn';
import Dashboard from './user/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import DashSellers from './user/DashSellers';
import NewHotel from '../src/hotels/NewHotel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paypal from './components/paypal/Paypal';
import './App.css';







function App() {

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <ToastContainer />
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignIn} />
                    <Route exact path="/paypal" component={Paypal} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/dashboard/seller" component={DashSellers} />
                    <PrivateRoute exact path="/hotel/new" component={NewHotel} />
                </Switch>

            </BrowserRouter>
        </div>
    );
}

export default App;
