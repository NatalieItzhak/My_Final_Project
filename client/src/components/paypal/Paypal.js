import React from 'react';
import {useState} from 'react';
import PaypalPay from '../paypal/Paypalpay';

const Paypal = () => {

    const [checkout, setCheckout] = useState(false)
    return (
        <div>
            {checkout? (
                <PaypalPay/>
            ):(
                <div className="landpage-cont">
                    <div className="container">
                <button className='button' onClick={() => { setCheckout(true) }}>Checkout </button>
                </div>
                </div>
            )}
          
        </div>
    )
}

export default Paypal;
