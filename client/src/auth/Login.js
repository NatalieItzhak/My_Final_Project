import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)

    const [error, setError] = useState(null);


    const userLogin= async () => {
        try{
           const response = await axios.post('api/users/login', {
                name:name,
                email:email,
                password:password
        });
            console.log(response);
         
    
        }catch(err){
                console.log(err); 
        }
    }

    const formHandler = (e)=>{
        e.preventDefault()
    }

    const handleLogin = ()=>{
        userLogin();
        props.history.push('/')
    }

    const handleClick = () => setChecked(!checked)
   
    return (
        <form onSubmit={formHandler} >
            <h1>Login</h1>
            <div>
                <label>User Name:</label><br></br>
                <input type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter Username"
                    autoComplete="name"
                    required />
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

                    required
                />
            </div>
            <br></br>
            {error && <div className="error">{error}</div>}
            <button
                onClick={handleLogin}
                type="submit"
               >Login</button>

            <label>
                <input type="checkbox"
                    onClick={handleClick} checked={checked}  onChange={e => setChecked(e.target.value)} /> Remember me
            </label>
            <div >
                <span className="psw">Forgot <a href="#">password?</a></span>

            </div>
        </form>
    )
}

export default Login
