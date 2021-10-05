import './messenger.css'
import Navbar from "../../components/navbar/Navbar"
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
// import { useEffect, useState } from "react"
// import { AuthContext } from "../../context/AuthContext"

export default function Messenger() {
    // const [conversations, setConversations] = useState([])
    // const { user } = useContext(AuthContext);

    // useEffect(() => {
    //     const getConversations = async () => {
    //         try {
    //             const res = await axios.get("/conversations/" + user.id)
    //             setConversation(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }


    // }, [input])
    // console.log(user)
    return (
        <>
            <Navbar />
            <div className="messenger">
                <div className="chatMenu" >
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for amigos" className="chatMenuInput" />
                        {/* {conversations.map(c => (
                            <Conversation conversation ={c} currentUser />
                        ))}

                        <Conversation/> */}
                    </div>

                </div>
                <div className="chatBox" >
                    <div className="chatboxWrapper">
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />


                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="communicate something"></textarea>
                            <button className="chatSend">SEND</button>
                        </div>
                    </div>
                </div>
                <div className="chatOnline" >
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}
