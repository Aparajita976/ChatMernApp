import React, { useEffect, useRef, useState } from 'react'
import Message from '../components/message'
import Chats from '../components/chats'
import 'react-icons';
import { Context } from '../context/Context';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-icons/ai';
import { AiOutlineSend } from 'react-icons/ai'
import { io } from "socket.io-client";
import ADD from "../images/addAvatar.png"
export default function Homepage() {

    const [conversations, setConversation] = useState([]);
    //const [currentuser, setCurrentuser] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [User, setUser] = useState(null);
    const [err, setErr] = useState(false);
    //const [socket, setSocket] = useState(null);
    const { user } = useContext(Context);
    const scrollRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const id = localStorage.getItem("userId");
    const path = JSON.parse(localStorage.getItem("user"));
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [friendUser, setFriendUser] = useState(null);

    //console.log(user.user._id)
    const socket = useRef()

    useEffect(() => {
        socket.current = io('https://chatnode-nz1z.onrender.com');
        socket.current.on('connect', () => {

            console.log(`you connected with id:${socket.current.id}`)
            console.log(socket)
        })
        //adduser
        socket.current.emit('custom-event', user.user._id)
        //getuser
        socket.current.on("getusers", users => {
            setOnlineUsers(users)
        })
        /*socket.current.on("getMessage", (body) => {

            setArrivalMessage({
                sender: body.senderId,
                text: body.text,
                createdAt: Date.now()
            })
            console.log(body)
        })*/
    }, [user])

    useEffect(() => {
        console.log("dude")
        socket.current.on("getMessagefromsocket", (data) => {
            console.log(data)
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        }
        );
    }, []);

    console.log(onlineUsers)
    arrivalMessage && console.log(arrivalMessage.sender)
    useEffect(() => {
        arrivalMessage && currentChat &&
            currentChat.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);



    useEffect(() => {
        const getconversation = async () => {
            try {
                const res = await axios.get("/conversation/" + user.user._id)
                console.log(user.user._id);
                console.log(res.data);
                setConversation(res.data);

            }
            catch (err) {
                console.log(err);
            }
        };
        getconversation()
    }, [user.user._id])

    useEffect(() => {

        const getMessages = async () => {
            try {
                const res = await axios.get(`/message/${currentChat._id}`);
                console.log(res.data)
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);
    console.log(currentChat)
    let friendId
    { currentChat && (friendId = currentChat.members.find((m) => m !== user.user._id)) }
    console.log(friendId)

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await axios.get(`/user/id/${friendId}`);
                console.log(res.data);
                setFriendUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: localStorage.getItem("userId"),
            text: newMessage,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat && currentChat.members.find(
            (member) => member !== user.user._id
        );
        socket.current.emit("sendMessage", {
            senderId: user.user._id, receiverId, text: newMessage
        })
        try {
            const res = await axios.post("/message/", message);
            setMessages([...messages, res.data])
        }
        catch (err) {
            return console.log(err)
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSearch = async () => {
        try {
            const res = await axios.get(`/user/${username}`);
            console.log(res.data)
            setUser(res.data)
            console.log(User)
        }
        catch (err) {
            setErr(true);
            return console.log(err)
        }
    }

    // useEffect(() => {
    const handleSelect = async () => {
        const data = {
            senderId: user.user._id,
            receiverId: User.user._id
        };
        try {
            const res = await axios.post("/conversation", data);
            console.log(res.data.conversation)
            //setConversation(conversations.push(res.data.conversation));
            setConversation([...conversations, res.data.conversation])
            console.log(conversations)
            setCurrentChat(res.data.conversation)
        }
        catch (err) {
            setErr(true);
            return console.log(err)
        }

    }
    //    }, [])
    /*const [friendUser, setFriendUser] = useState()
    useEffect(() => {
        const friendId = conversations.members.find((m) => m !== user.user._id)
        console.log(friendId)
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/id/${friendId}`);
                console.log(res.data);
                setFriendUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [conversations]);
    console.log(friendUser)*/




    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.setItem("userId", null);
        alert("Logged Out successfully")
    }
    console.log(newMessage)
    console.log(user.user.profilePic);
    //const pf = http://localhost:8800/images/
    return (
        <div ClassName="pagestructure">
            <div className="homestructure">
                <div className="sidestructure">
                    <div className="box">
                        <div className='navbar  navbar1 ' >

                            <span className="navbar-brand1" style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>AChattz</span>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo01">
                                <ul class="navbar-nav">
                                    <li class="nav-item nav-item1 nav-link1"><Link to="/userinfo"><img style={{ width: "2.5rem" }} className="topBarImage" src={`${user.user.profilePic !== "" ? ("https://chatnode-nz1z.onrender.com/images/images/" + user.user.profilePic) : ADD}`} alt={ADD} /></Link></li>
                                    <li class=" nav-item1" style={{ fontWeight: "bold", fontSize: "1.2rem" }}><span>{user.user.name}</span></li>
                                    <li class=" nav-item1 " ><Link className="nav-link1" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "1.5rem", marginRight: "1rem" }} onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            </div>

                        </div>
                        <div>
                            <div style={{ display: "flex" }}>
                                <input type="text" name="name" className=" searchBar" style={{ flex: "1" }} id="name" placeholder='Find a user' onKeyDown={handleKey}
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username} />
                                <button style={{ backgroundColor: "#ddddf7" }} onClick={handleSearch}>Enter</button>
                            </div>



                            {User ? <div>
                                <div className="userChat" onClick={handleSelect}>
                                    <img className="profilepic" src={ADD} alt="" />
                                    <div className="row1 row eachchat ">
                                        <span className="name">{User.user.name}</span>
                                    </div>
                                    <hr style={{ borderBlockWidth: "0.5rem" }} />
                                </div>
                            </div> : (err && <span style={{ color: "#", fontSize: "1rem", padding: "1rem" }}>User not found!</span>)}
                        </div>
                        <div>

                            {conversations.map((c) =>
                            (<div onClick={() => setCurrentChat(c)}>

                                <Chats conversation={c} currentuser={user.user}

                                />


                            </div>))}


                        </div>
                    </div>
                </div>



                <div>


                    <div className="chatStructure">
                        {currentChat ? <div>
                            <div className="navbar chatbar navbar-expand-lg">
                                <div className="container1">
                                    <span>{friendUser && friendUser.user.name}</span>
                                </div>
                            </div>


                            <div className="messagestructure" style={{ overflowY: "scroll" }}>

                                {
                                    (messages.map((m) => (
                                        <div className="scroll" ref={scrollRef} >
                                            <Message message={m} />
                                        </div>
                                    )))}




                            </div >
                            < div className='inputstructure '>
                                <input className="input form-control" type="text" placeholder='enter the message' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />



                                <button style={{ border: "none", backgroundColor: "white", marginTop: "0.5rem", marginBottom: "0.5rem", width: "2rem" }} onClick={newMessage ? handleSubmit : null}><i className="icons sendButton"><AiOutlineSend /></i></button>


                            </div >

                        </div>
                            : <div className="mx-auto" style={{ fontSize: "3rem", color: "white", fontWeight: "bold" }}>Start a conversation</div>
                        }


                    </div>






                </div>
            </div>
        </div>
    )

}
