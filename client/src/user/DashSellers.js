import React from 'react';
import DashNav from '../components/DashNav';
import { Link } from 'react-router-dom';
import { sellerHotels } from '../components/actions/hotel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DashSellers = () => {

    // const { auth } = useSelector((state) => ({ ...state }));
    // const [loading, setLoading] = useState(false);
    // const [hotels, setHotels] = useState([]);

    // useEffect(() => {
    //     showSellerHotels()
    // }, []);

    // const showSellerHotels = async () => {
    //     const res = await sellerHotels(auth.token)
    //     setHotels(res.data)
    // }
    return (
        <>
        <div className="bg">
            <div className="aniTitle">
                <h1>Post your Hotels Rooms</h1>
            </div>
            <div className="container-fluid p-4">
                <DashNav />
            </div>

            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-10">
                  
                    </div>
                    <div className='col-md-2'>
                        <Link to="/hotel/new" className="button"> Add New Hotel</Link>
                    </div>
                    <div className="row">
                        {/* {JSON.stringify(hotels)} */}

                    </div>
                </div>
            </div>
            </div>
        </>
    );
};


export default DashSellers;
