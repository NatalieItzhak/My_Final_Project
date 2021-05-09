import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const SignIn = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/signin`, {
                name: name,
                email: email,
                password: password
            });
            console.log(res);
            toast.success('Sign in success! you can now login')
            props.history.push('/login')
        } catch (err) {
            console.log(err);
            if (err.response.status === 400) toast.error(err.response.data)
        }
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit} className="mt-3">
                            <h1>Sign In</h1>
                            <p>Please fill in this form to create an account.</p>
                            <div className="form-group mb-3">
                                <label className="form-lable">Name:</label>
                                <input type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Username"
                                    required />
                            </div>
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
                              disabled={!email ||!password || !name}
                                type="submit"
                            >Submit</button>
                            <p>By creating an account you agree to our <a>Terms & Privacy</a>.</p>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}


export default SignIn;


