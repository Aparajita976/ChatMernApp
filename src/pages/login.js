import React from 'react'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'
import { Context } from '../context/Context';
import axios from 'axios';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { dispatch, isFetching } = useContext(Context);
    const sendRequest = async () => {
        setError(false);
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios
                .post("/user/login", {

                    email: email,
                    password: password
                })
            console.log(res.data.user._id);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            const data = await res.data;
            return data;

        }

        catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });

            console.log(err)
            setError(true);

        }

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        sendRequest().then((data) => localStorage.setItem("userId", data.user._id));
    };
    return (
        <div className='formcontainer'>


            <form className="card card1" onSubmit={handleSubmit}>
                <span style={{
                    color: "#5d5b8d",
                    fontWeight: "bold",
                    fontSize: "24px",
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem"
                }}>Login</span>
                <div>
                    <input type="email" name="email" className="form-control" id="email"
                        placeholder="Enter the email address" value={email}
                        onChange={
                            (e) => setEmail(e.target.value)} />
                </div>

                <div >
                    <input type="password" name="password" className="form-control" id="password"
                        placeholder="Enter the password" value={password}
                        onChange={
                            (e) => setPassword(e.target.value)} />
                </div>
                <div >
                    <button className="btn btn-md btn-dark" type="submit">Login</button>

                </div>
                <div>
                    {error && <span style={{ color: "red" }}>Something went wrong!!</span>}
                </div>
                <div>
                    <Link className="accountlink" to={"/register"}>Don't have an account! Register</Link>
                </div>


            </form>

        </div >
    )
}

export default Register