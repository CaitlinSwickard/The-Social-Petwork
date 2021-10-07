import Messenger from "../../pages/messenger/Messenger"
import "./message.css"


export default function Message({own}) {
    return (
        <div className = {own ? "message own" : "message" }>
            <div className ="messageTop">
                <img className = "messageImg"
                 src ="../../assets/pet.png" alt= ""/>
                <p className ="messageText">WOOF WOOF Bark bark WOof bark wooof Bark WOof SQUIRL!! WALK ME!! </p>
            </div>
            <div className = "messageBottom">1 hr ago</div>
        </div>
    )
}
