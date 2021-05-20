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
                <button className='btn btn-primary' onClick={() => { setCheckout(true) }}>Checkout </button>
            )}
          
        </div>
    )
}

export default Paypal;
