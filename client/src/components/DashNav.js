import React from 'react';
import { Link } from 'react-router-dom';

const DashNav = () => {
    const active =window.location.pathname;
   

    return (
        <div className="">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className={`nav-link ${active === '/dashboard' && "active"}`} to='/dashboard'>Your Booking History</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${active === '/dashboard/seller' && "active"}`} to='/dashboard/seller'>Post</Link>
            </li>
        </ul>
       </div>
    )
}

export default DashNav;
