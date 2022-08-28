import styled from "styled-components";
import {Avatar} from "@mui/material";
import {db} from "../Firebase";
import {doc, collection} from "@firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";
import {Message} from './Message'

export const ChatRooms = ({message} : {message : []}) =>
{

    const {query : {id}} = useRouter()


    const getSpecificChatRooms = doc(db , 'chats' , id as string)

    const messageCollection = collection(getSpecificChatRooms , 'message')

    const [messageData] = useCollection(messageCollection)

    let showMessage: any ;

    if (messageData)
    {
        showMessage = messageData?.docs.map((data : any) => <Message key={data.id} message={{...data.data() , timeStamp : data.data().timeStamp.toDate().getTime()}}/>)
    }
    else
    {
        showMessage = message.map((data : any) => <Message key={data.id} message={data}/>)
    }

    return (
        <Container>
            <Header>
                <div className='w-25 d-flex justify-content-evenly align-items-center'>
                    <Avatar/>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p>Example@yahoo.com</p>
                        <p>last seen : 20 min ago</p>
                    </div>
                </div>
            </Header>

            <ShowMessage>
                {showMessage}
            </ShowMessage>




        </Container>
    )
}


const Container = styled.div`
  width: 75vw;
  height: 100vh;
  background: #e7d6d6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  height: 15vw;
  background: cornflowerblue;
  

`