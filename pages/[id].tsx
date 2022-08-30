import {chatCollection} from "../Firebase";
import {collection, query, orderBy, getDoc, doc, onSnapshot, SnapshotMetadata, getDocs} from "@firebase/firestore";
import {db} from "../Firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import styled from "styled-components";
import {Sidebar} from "../components/Sidebar";
import {ChatRooms} from "../components/ChatRooms";


const showChats = ({messages , chatArray} : {messages : string , chatArray : []}) => {


    return (
        <Container>
            <ChatRooms chatArray={chatArray} message={JSON.parse(messages)}/>
        </Container>
    )
}

export default showChats

export const getServerSideProps = async (context: any) => {

    const specificChatData = doc(db, 'chats', context.params.id)

    //Recognize message collection and ready to fetch data
    const messageData = await query(collection(specificChatData, 'message'), orderBy('timeStamp', 'asc'))


    //Fetch message collection data and put in array
    let currentMessage : any = []
    await getDocs(messageData)
        .then((snapShot) => snapShot.docs.forEach(messageData => currentMessage.push({...messageData.data() , id : messageData.id})) )

    //Handel Timestamp
    // const currentMessage = saveMessageData.map((message : any) => ({...message}))
    //all message in database
    // {
    //     message: 'example',
    //     hostUserAvatar: 'example',
    //     hostUserEmail: 'example@yahoo.com',
    //     timeStamp: example,
    //     id: 'example'
    // }



    const chatArray = await getDoc(specificChatData).then(doc => doc.data()?.userChats)
    // [ 'host@gmail.com', 'gust@yahoo.com' ]
    // [ 'host@gmail.com', 'gust@yahoo.com' ]


    console.log(currentMessage)

    return {
        props : {
            messages : JSON.stringify(currentMessage),
            chatArray
        },
    }
}


const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;

`