import { Avatar,IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined, Mic } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useParams } from 'react-router-dom'
import db from './firebase';
import userEvent from '@testing-library/user-event';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import {useStateValue} from "./StateProvider"


function Chat() {
  
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState("");
    const [{user}, dispatch] = useStateValue();

    useEffect(()=> {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc =>
            doc.data()))
            ));
        }
    }, [roomId])


    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
  
        console.log("You typed >>>", input)
        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }
    let m2;
    if(messages){
        m2 = messages.map(message => (
            message.message
          ))
    }
    

     console.log(m2)

    return (
    <div className='chat'>
        <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>last seen{" "}
                {messages.length !== 0
                  ? String(
                      messages[messages.length - 1].timestamp
                        ?.toDate()
                        .toUTCString()
                    ).slice(0, 22)
                  : "Loading"}</p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />                  
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>
        <div className="chat__body">
        {    
            messages.map?messages.map((message) => (
               <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}><span className="chat__name">{message.name}</span> {message.message}
               <span className="chat__timestamp">
               {new Date(message.timestamp?.toDate()).toUTCString().slice(0, 22)
                }
               </span>
               </p> 
            )):
            <p className={`chat__message ${true && 'chat__receiver'}`}><span className="chat__name">Chat Name</span> Hey ALL
            <span className="chat__timestamp">
                
            </span>
            </p> 
            } 
        </div>
        <div className="chat__footer">
            <InsertEmoticon />
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." type="text"/>
                <button onClick={sendMessage} type="submit">Send a message</button>
            </form>
            <Mic/>
        </div>
    </div>
  )
}

export default Chat