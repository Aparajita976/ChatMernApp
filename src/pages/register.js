import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../style.css'
import Add from '../images/addAvatar.png'
import axios from 'axios'
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false);
    const [file, setFile] = useState(null);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        profilePic: ""
    });
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const sendRequest = async () => {


        /*const res = await axios
            .post("http://localhost:5000/user/signup", {
                name: name,
                email: email,
                password: password,
                profilePic: profilePic
            })*/

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            inputs.profilePic = filename;
            try {
                await axios.post("https://chatbackend-jjk0.onrender.com/upload", data);
            } catch (err) {
                return console.log(err);

            }
        }
        // const data = await res.data;
        //return data;



        /*catch (err) {
            setError(true);
            return console.log(err);

        }*/
        // const data = await res.data;
        //return data;


        /*const newUser = {
            name, email, password,
        };*/
        /* if (file) {
             const data = new FormData();
             const filename = Date.now() + file.name;
             data.append("name", filename);
             data.append("file", file);
             newUser.profilePic = filename;
             try {
                 await axios.post("http://localhost:5000/upload", data);
             } catch (err) { return console.log(err); }
         }*/
        setError(false);
        try {
            const res = await axios.post("/user/signup", {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                profilePic: inputs.profilePic
            })
            // const data = await res.data;
            //return data;
            const data = await res.data;
            window.location.replace("/login");
            return data;
        }
        catch (err) {
            return console.log(err),
                setError(true);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // send http request

        sendRequest()


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
                }}>Register</span>
                <div>
                    <input type="text" name="name" className="form-control" id="name"
                        placeholder="Enter your name" onChange={handleChange} value={inputs.name} />

                </div>
                <div>
                    <input type="email" name="email" className="form-control" id="email"
                        placeholder="Enter your email address" onChange={handleChange} value={inputs.email} />
                </div>

                <div >
                    <input type="password" name="password" className="form-control" id="password"
                        placeholder="Enter the password" onChange={handleChange} value={inputs.password} />
                </div>

                {/*<label style={{ marginBottom: "2rem" }}>
                    <input type="file" className="avatarimage" onChange={(e) => setFile(e.target.files[0])} />
                    <span style={{
                        paddingLeft: "1rem"
                    }}>Add an avatar</span>
                </label>*/}


                <div>
                    <label for="file" class="custom-file-upload">
                        <img className="avatarimage" src={Add}></img> Add an avatar
                    </label>
                    <input id="file" name="file" type="file" onChange={(e) => setFile(e.target.files[0])} value={inputs.profilePic} />
                </div>



                <div >
                    <button className="btn btn-md btn-dark" type="submit">Register</button>

                </div>
                <div>
                    {error && <span style={{ color: "red" }}>Something went wrong!!</span>}
                </div>

                <div>
                    <Link className="accountlink" to={"/login"}>Already have an account! Login</Link>
                </div>


            </form>

        </div >
    )
}

export default Register