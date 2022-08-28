import {chatCollection} from "../Firebase";
import {collection, query, orderBy, getDoc, doc, onSnapshot, SnapshotMetadata, getDocs} from "@firebase/firestore";
import {db} from "../Firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import styled from "styled-components";
import {Sidebar} from "../components/Sidebar";
import {ChatRooms} from "../components/ChatRooms";


const showChats = ({messages} : {messages : []}) => {

    console.log(messages)

    return (
        <Container>
            <Sidebar/>
            <ChatRooms message={messages}/>

        </Container>
    )
}

export default showChats

export const getServerSideProps = async (context: any) => {


    const specificChatData = doc(db, 'chats', context.params.id)

    const messageData = await query(collection(specificChatData, 'message'), orderBy('timeStamp', 'asc'))

    let saveMessageData : any = []

    await getDocs(messageData)
        .then((snapShot) => snapShot.docs.forEach(messageData => saveMessageData.push({...messageData.data() , id : messageData.id})) )

    console.log(saveMessageData)


    const currentMessage = saveMessageData.map((message : any) => ({...message , timeStamp : message.timeStamp.toDate().getTime()}))

    console.log(currentMessage)

    return {
        props : {
            messages : currentMessage

        }
    }
}


const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: gainsboro;
  display: flex;
  justify-content: space-between;
  align-items: center;

`