import React, { useEffect, useState } from 'react'
import Add from '../images/addAvatar.png'
import axios from 'axios';
import { useRef } from 'react';

export default function Chats({ conversation, currentuser }) {


    const [user, setUser] = useState(null);
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentuser._id)
        console.log(friendId)
        const getUser = async () => {
            try {
                const res = await axios.get(`/user/id/${friendId}`);
                console.log(res.data);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentuser, conversation]);


    return (
        <div >

            {user &&
                <div >
                    <div className=" eachchat">
                        < img className="profilepic" src={`${user.user.profilePic !== "" ? ("https://chatnode-nz1z.onrender.com/images/images/" + user.user.profilePic) : Add}`} alt={Add} />
                        <div className="row1 row  eachchat" >
                            <span className="name">{user.user.name}</span>


                        </div>
                    </div>
                </div>
            }

        </div>
    )
}


