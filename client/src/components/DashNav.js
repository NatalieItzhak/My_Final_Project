import React from 'react';
import { Link } from 'react-router-dom';

const DashNav = () => {
    const active =window.location.pathname;
   

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className={`nav-link ${active === '/dashboard' && "active"}`} to='/dashboard'>Your Bookings</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${active === '/dashboard/seller' && "active"}`} to='/dashboard/seller'>Post new deal</Link>
            </li>
        </ul>
    )
}

export default DashNav;
