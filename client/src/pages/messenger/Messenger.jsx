import './messenger.css'
import Navbar from "../../components/navbar/Navbar"
import Conversation from '../../components/conversations/Conversation'

export default function Messenger() {
    return (
        <>
        <Navbar/>
        <div className="messenger">
            <div className="chatMenu" >
                <div className="chatMenuWrapper">
                    <input placeholder ="Search for amigos" className= "chatMenuInput"/>
                    <Conversation/>
                    <Conversation/> 
                    <Conversation/>
                </div>
                
            </div>
            <div className="chatBox" >
                <div className="chatboxWrapper">
                    <div className ="chatboxTop"></div>
                    <div className ="chatboxbottom"></div>
                </div>
            </div>
            <div className="chatOnline" >
                <div className="chatOnlineWrapper">online</div>
            </div>
        </div>
        </>
    )
}
