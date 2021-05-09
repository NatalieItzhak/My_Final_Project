import React from 'react';
import DashNav from '../components/DashNav';
import ConnectNav from '../components/ConnectNav';

const Dashboard = () => {
    return (
        <>
            <div className="container-fluid p-5">
            <ConnectNav/>
            </div>
            <div className="container-fluid p-4">
              <DashNav/>  
            </div>

            <div  className="container">
                <p>Show all bookings and a button to browse hotels</p>
            </div>
        </>
    );
};

export default Dashboard;
