import { useEffect, useState } from "react"
import "./conversation.css"

export default function Conversation({conversation,currentUser}) {
    const [user,setUser] =useState(null)

    useEffect(()=>{
        const friendId = conversation.member.find(m=>m !== currentUser._id)
        cosnt getUser = async ()={
            const res  = await axios ("/users")
        }
    },[])


    return (
        <div className = "conversation">
            <img className = "conversationImg" src = "../../assets/pet.png" alt= ""/>
            <span className =" conversationName">Jhon Doe </span>
        </div>
    )
}

