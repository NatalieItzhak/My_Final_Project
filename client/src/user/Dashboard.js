import React from 'react';
import DashNav from '../components/DashNav';
import ConnectNav from '../components/ConnectNav';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <div className="container-fluid p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-4">
                <DashNav />
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                    </div>
                    <div className='col-md-2'>
                        <Link to="/home" className="button">Search New Deals</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
