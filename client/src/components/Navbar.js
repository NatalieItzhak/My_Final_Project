import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const Navbar = () => {


    const { auth } = useSelector((state) => ({ ...state }));
    const history = useHistory()
    const logout = () => {
  
        window.localStorage.removeItem('auth');
        history.push('/login')
    };
    return (
        <div>

            <div className="header">
                <NavLink className="nav-link" activeclassname="active" to="/home">Home</NavLink>

                {auth !== null && (
                    <NavLink className="nav-link " activeclassname="active" to="/dashboard">Bookit</NavLink>
                )}
                {auth !== null && (
                    <a className="nav-link" onClick={logout} to="/login">Logout</a>
                )}
                {auth === null && <>
                    <NavLink className="nav-link " activeclassname="active" to="/login">Login</NavLink>
                    <NavLink className="nav-link" activeclassname="active" to="/signup">Sign in</NavLink>
                    <NavLink className="nav-link" activeclassname="active" to="/paypal">Paypal</NavLink>
                </>}
            </div>

        </div>
    )
};
export default Navbar;
