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
        showMessage = messageData?.docs.map((message : any) => <Message key={message.id}  messageData={message.data()} serverSide={'server side off'}/>)
    }
    else
    {
        showMessage = message.map((message : any) => <Message key={message.id} messageData={message} serverSide={'server side fire'}/>)
    }



    const sendMessage = async () =>
    {
        const specificChatRef = doc(db , 'chats' , id as string)

        await addDoc(collection(specificChatRef , 'message') , {
            timeStamp : new Date().getTime(),
            message : inputValue ,
            hostUserEmail : hostUser?.email,
            hostUserAvatar : hostUser?.photoURL
        })
        scrollToBottom()
        setInputValue('')
    }



    const gustData = userData?.docs?.[0]?.data()
    //{email , photoUrl , timeStamp}

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
                <div className='w-100 d-flex justify-content-start align-items-center'>

                    <Avatar className='ms-2' src={gustData?.photoUrl}/>

                    <div className='d-flex flex-column justify-content-start align-items-start ms-3 py-2'>
                        <p className='text-xl-center fst-italic fw-bold text-light'>{gustData?.email}</p>
                        <p className='fs-6 fw-semibold text-light'>Last seen <TimeAgo datetime={gustData?.timeStamp?.toDate().getTime()}/></p>
                    </div>

                </div>
            </Header>


            <ShowMessage>
                {showMessage}
                <EndMessage ref={endOfMessageRef}/>
            </ShowMessage>


            <Footer>
                <input className='w-75 h-50 rounded-2 border-0 p-2' value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='type ...'/>
                <button className='btn btn-outline-light' onClick={sendMessage}>send</button>
            </Footer>

        </Container>
    )
}


const Container = styled.div`
  width: 75vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Header = styled.div`
  width: 100%;
  height: 5vw;
  //background: aqua;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #212121; ;

  @media screen and (max-width: 480px) {
    height: 15vw;
  }
`

const ShowMessage = styled.div`
  width: 100%;
  height: 40vw;
  background: #424242;
  overflow-y: scroll;
  padding: 1vw 0;

  @media screen and (max-width: 480px) {
    height: 100%;
  }
`

const Footer = styled.div`
  width: 100%;
  height: 5rem;
  //background: antiquewhite;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #212121;

  @media screen and (max-width: 480px) {
    height: 5rem;
  }

`

const EndMessage = styled.div`
  margin-bottom: 50px;
`