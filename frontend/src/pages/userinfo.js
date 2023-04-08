import React from 'react'
import { Context } from '../context/Context';
import { useContext } from 'react';
export default function Userinfo() {
    const { user } = useContext(Context)
    const path = JSON.parse(localStorage.getItem("user"));
    console.log(path);
    return (

        <div class="formcontainer" >
            <div class="card card1 ">
                <div style={{ margin: "auto" }}>
                    <h1 style={{ margin: "auto", marginBottom: "10%" }}>Account Details</h1>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0" style={{ fontSize: "1.5rem" }}>Full Name</h6>
                        </div>
                        <div class="col-sm-9 text-secondary" style={{ fontSize: "1.5rem" }}>
                            {path.user.name}
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0" style={{ fontSize: "1.5rem" }}>Email</h6>
                        </div>
                        <div class="col-sm-9 text-secondary" style={{ fontSize: "1.5rem" }}>
                            {path.user.email}                      </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-3" >
                            <img
                                style={{ margin: "auto", width: "10%", marginTop: "2rem", width: "250px", height: "250px", borderRadius: "100%" }} src={"https://chatnode-nz1z.onrender.com/images/images/" + user.user.profilePic}
                                alt=""
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>

        /*<img
            style={{ width: "10%", marginTop: "2rem", width: "300px", height: "300px", borderRadius: "100%", float: "left" }} className="mx-auto" src={"http://localhost:5000/images/images/" + user.user.profilePic}
            alt=""
/>*/

    )
}
