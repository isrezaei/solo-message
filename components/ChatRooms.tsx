import styled from "styled-components";
import {Avatar} from "@mui/material";
import {chatCollection , userCollection , db , auth} from "../Firebase";
import {doc, collection, query, orderBy, updateDoc, addDoc, serverTimestamp, where} from "@firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";
import {Message} from './Message'
import {useState} from "react";
import {RecipientEmails} from "../lib/recipientEmails";
import {useAuthState} from "react-firebase-hooks/auth";
import TimeAgo from "timeago-react";
import firebase from "firebase/compat";
import {useRef} from "react";


export const ChatRooms = ({message , chatArray} : {message : [] , chatArray : []}) =>
{
    const [hostUser] = useAuthState(auth)

    const {query : {id}} = useRouter()

    const [inputValue , setInputValue] = useState<string>('')

    const getSpecificChatRooms = doc(db , 'chats' , id as string)

    const messageCol = query(collection(getSpecificChatRooms , 'message') , orderBy('timeStamp' , 'asc'))

    const userCol = query(userCollection , where('email', '==' , RecipientEmails(hostUser?.email , chatArray)))

    const [messageData] = useCollection(messageCol)
    const [userData] = useCollection(userCol)

    const endOfMessageRef = useRef<null>(null);


    let showMessage: any ;
    if (messageData)
    {
        showMessage = messageData?.docs.map((message : any) => <Message key={message.id}  messageData={message.data()}/>)
    }
    else
    {
        showMessage = message.map((message : any) => <Message key={message.id} messageData={message}/>)
    }


    const sendMessage = async () =>
    {
        const specificChatRef = doc(db , 'chats' , id as string)

        await addDoc(collection(specificChatRef , 'message') , {
            timeStamp : serverTimestamp(),
            message : inputValue ,
            hostUserEmail : hostUser?.email,
            hostUserAvatar : hostUser?.photoURL
        })
        scrollToBottom()
        setInputValue('')
    }


    const gustEmail = RecipientEmails(hostUser?.email , chatArray)

    console.log(userData?.docs?.[0].data())

    //{email , photoUrl , timeStamp}

    const gustData = userData?.docs?.[0]?.data()


    const scrollToBottom = () => {
        // @ts-ignore
        endOfMessageRef?.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };


    return (
        <Container>


            <Header>
                <div className='w-25 d-flex justify-content-evenly align-items-center'>

                    <Avatar src={gustData?.photoUrl}/>

                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p className='text-xl-center'>{gustData?.email}</p>
                        <TimeAgo datetime={gustData?.timeStamp?.toDate().getTime()}/>
                    </div>
                </div>
            </Header>


            <ShowMessage>
                {showMessage}
                <EndMessage ref={endOfMessageRef}/>
            </ShowMessage>


            <Footer>

                <input className='w-75 h-50' value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='type ...'/>
                <button className='btn btn-info' onClick={sendMessage}>send</button>

            </Footer>
        </Container>
    )
}


const Container = styled.div`
  width: 75vw;
  height: 100vh;
  background: #e7d6d6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Header = styled.div`
  width: 100%;
  height: 5vw;
  background: aqua;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ShowMessage = styled.div`
  width: 100%;
  height: 40vw;
  background: cornflowerblue;
  overflow-y: scroll;
  padding: 1vw 0;
`

const Footer = styled.div`
  width: 100%;
  height: 5rem;
  background: antiquewhite;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

`

const EndMessage = styled.div`
  margin-bottom: 50px;
`