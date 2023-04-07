import React, { useEffect, useState } from 'react'
import Add from "../images/addAvatar.png"
import { Context } from "../context/Context"
import { useContext } from 'react';
import axios from 'axios';
export default function ({ message }) {


    const { user } = useContext(Context)
    const own = localStorage.getItem("userId") === message.sender;

    return (

        <div>

            <div className={own ? "message own" : "message"}>
                <div className="messageTop">
                    <img
                        className="messageImg" src={own ? "https://chatbackend-jjk0.onrender.com/images/images/" + user.user.profilePic : Add}
                        alt=""
                    />
                    <p className="messageText">{message.text}</p>
                </div>

            </div>

        </div>
    )
}
