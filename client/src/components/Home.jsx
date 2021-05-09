import React from 'react';
import '../App.css'
import {useSelector} from 'react-redux';

const Home = (props) => {
    
    const {user} = useSelector((state) =>({...state}));



    return (
        <div className="container-fluid h1 text-center">
            <h1>Home</h1>
           {JSON.stringify(user)}
        </div>
    )
}

export default Home
