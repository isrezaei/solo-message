import {ChatsRooms} from "../components/Chats.Rooms/Chats.Rooms";
import {getDocs ,getDoc, query, doc, collection, orderBy, where} from "@firebase/firestore";
import {db} from "../config/Firebase";
import {FilterGuestEmail} from "../lib/FilterGuestEmail";
import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";
import {auth} from "../config/Firebase";

const ServerRender = ({serverSideData} : {serverSideData : any}) =>
{
    // we can't use 'useCollection()' because useCollection can not accept Json.Parse , its custom object
    return (
        <ChatsRooms
            serverSideMessage={JSON.parse(serverSideData.messageData)}
            serverSideUsersLoginData={JSON.parse(serverSideData.usersLoginData)}/>
    )
}
export default ServerRender


export const getStaticPaths  = async () =>
{

    const messageQuery = collection(db , `USERS_CHAT`)
    const slugs = await getDocs(messageQuery).then(snapshot => snapshot.docs.map(message => message.id))
    const msgIDs = slugs.map(msgID => {
        return {
            params : {id : msgID}
        }
    })
    return {
        paths : msgIDs,
        fallback : 'blocking'
    }
}

export const getStaticProps = async ({params} : {params :{id : string}}) =>
{
    const messageArray : any[] = []
    const messageQuery = query(collection(db , `USERS_CHAT/${auth.currentUser?.email}/CHAT_BETWEEN_USERS`) , orderBy('timeStamp' , 'asc'))
    await getDocs(messageQuery).then(snapshot => snapshot.docs.map(message => messageArray.push(message.data())))

    const usersLoginQuery = collection(db , 'USERS_LOGIN')
    const usersLoginData = await getDocs(usersLoginQuery).then(snapshot => snapshot.docs.map(users => users.data()))

    return {
        props : {
            serverSideData : {
             messageData : JSON.stringify(messageArray),
             usersLoginData : JSON.stringify(usersLoginData)
            }
        },
        revalidate : 1
    }
}