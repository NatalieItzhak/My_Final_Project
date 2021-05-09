import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import moment from 'moment';
import Meta from 'antd/lib/card/Meta';


const ConnectNav = () => {

    const { Meta } = Card
    const { auth } = useSelector((state) => ({ ...state }));
    const { user } = auth;
    return (
        <div className='d-flex justify-content-around'>
            <Card>
                <Meta avatar={<Avatar>{user.name[0]}</Avatar>} title={user.name} description={`Joined ${moment(user.createdAt).fromNow()}`} />
            </Card>
            {/* {auth && auth.user && auth.user.stripe_seller.charges_enabled && (
                <>
                    <div>Pending balance</div>
                    <div>pay setting</div>
                </>
            )} */}

        </div>
    )
}

export default ConnectNav;
