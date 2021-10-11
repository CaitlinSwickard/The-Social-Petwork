import Messenger from "../../pages/messenger/Messenger"
import "./message.css"


export default function Message({own,messageText, messageBottom}) {
    return (
        <div className = {own ? "message own" : "message" }>
            <div className ="messageTop">
                <img className = "messageImg"
                 src ="../../assets/pet.png" alt= ""/>
                <p className ="messageText">{messageText} </p>
            </div>
            <div className = "messageBottom">{messageBottom}</div>
        </div>
    )
}
