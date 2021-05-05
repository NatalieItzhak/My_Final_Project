import React, { useState } from 'react';
import axios from 'axios';

function SignUp(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUpForm = async () => {
        try {
            const response = await axios.post('api/users/signup', {
                name: name,
                email: email,
                password: password
            });
            console.log(response);


        } catch (err) {
            console.log(err);
        }
    }

    const formHandler = (e) => {
        e.preventDefault()
        signUpForm();
    }

    // const handleSignup = () => {
    //     signUpForm();
    //     props.history.push('/')
    // }


    return (
        <form onSubmit={formHandler}>
            <h1>Sign up</h1>
            <p>Please fill in this form to create an account.</p>
            <div>
                <div>
                    <label>User Name:</label><br></br>
                    <input type="text"
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter Username"
                        required />
                </div>
            </div>
            <div>
                <label>Email:</label><br></br>
                <input type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    autoComplete="email"
                    required />
            </div>
            <div>
                <label>Password:</label><br></br>
                <input type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    name="psw"
                    required
                />
            </div>
            <br></br>
            <button
                type="submit"
            >Register</button>
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

        </form>
    )
}

export default SignUp
