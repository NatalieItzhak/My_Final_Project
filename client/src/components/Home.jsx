import React from 'react';
import '../App.css';
import { allHotels } from './actions/hotel';
import { useState, useEffect } from 'react';
import HotelCard from './Cards/HotelCard';




const Home = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        showAllHotels();
    }, []);

    const showAllHotels = async () => {
        const res = await allHotels();
        setHotels(res.data);
    }


    return (
        <>
            <div className="container-fluid text-center ">
                <h1 className="titlehotels">Monthly Hotels Deals</h1>
            </div>
            <div className="cont">
                {hotels.map((h) =>
                    <HotelCard key={h._id} h={h} owner={false} />)}
            </div>

        </>
    )
}

export default Home
