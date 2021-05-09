import React from 'react';
import DashNav from '../components/DashNav';

const DashSellers =()=> {
        return (
            <>
                <div className="container-fluid p-5">
                    <h1>Dashboard</h1>
                </div>
                <div className="container-fluid p-4">
                  <DashNav/>  
                </div>
    
                <div  className="container">
                    <p>Show all Hotels user have posted and button to add new</p>
                </div>
            </>
        );
    };
    

export default DashSellers;
