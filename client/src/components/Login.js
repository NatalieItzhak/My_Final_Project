import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('sending login data', { email, password })
        try {
            const res = await axios.post(`/api/login`, {
                email,
                password
            });
            console.log('Login res:', res);
            toast.success('you can now book your hotel')
            if (res.data) {

                console.log(res.data)
                window.localStorage.setItem('auth', JSON.stringify(res.data));
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload: res.data,
                });
                props.history.push('/dashboard')
            }

        } catch (err) {
            console.log(err);
            if (err.response.status === 400) toast.error(err.response.data)
        }
    }

    return (
        <>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit} className="mt-3">
                        <h1>Login</h1>
                        <div className="form-group mb-3">
                            <label className="form-lable">Email:</label>
                            <input type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                                required />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-lable">Password:</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required />
                        </div>
                        <button
                            disabled={!email || !password}
                            type="submit"
                        >Submit</button>
                    </form>
                </div>
            </div>

        </>

    )
}

export default Login
