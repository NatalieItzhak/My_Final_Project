import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'antd';




const ConnectNav = () => {

    const { Meta } = Card
    const { auth } = useSelector((state) => ({ ...state }));
    const { user } = auth;
    return (
        <div className='cont'>
         
                <Meta className="aniTitle" title={`Hello ${user.name} Welcome to Bookit `} />
           
        

        </div>
    )
}

export default ConnectNav;
