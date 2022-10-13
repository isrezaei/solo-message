import {ChatsRooms} from "../components/Chats.Rooms/Chats.Rooms";
import {getDocs ,getDoc, query, doc, collection, orderBy, where} from "@firebase/firestore";
import {auth, db} from "../config/Firebase";
import {FilterGuestEmail} from "../lib/FilterGuestEmail";


const ServerRender = ({serverSideData} : {serverSideData : any}) =>
{
    // we can't use 'useCollection()' because useCollection can not accept Json.Parse , its custom object
    return (
        <ChatsRooms
            serverSideMessage={JSON.parse(serverSideData.messageData)}
            CURRENT_GUST_USER_DATA={JSON.parse(serverSideData.CURRENT_GUST_USER_DATA)}
            USERS_LOGIN_DATA={JSON.parse(serverSideData.USERS_LOGIN_DATA)}    />
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
    const messageQuery = query(collection(db , `USERS_CHAT/${params?.id}/CHAT_BETWEEN_USERS`) , orderBy('timeStamp' , 'asc'))
    await getDocs(messageQuery).then(snapshot => snapshot.docs.map(message => messageArray.push(message.data())))


    //? GET CURRENT GUST USER DATA FOR HEADER OF EACH CHAT ROOM
    const CURRENT_GUST_USER_DATA : any = []
    const usersLoginQuery = doc(db , `USERS_CHAT` , `${params?.id}`)
    const USERS_LOGIN_DATA = await getDoc(usersLoginQuery).then(snapshot => snapshot.data())

    const GET_LOGIN_DATA = query(collection(db , 'USERS_LOGIN') , where('email' , '==' , `${FilterGuestEmail(auth.currentUser?.email , USERS_LOGIN_DATA)}`))
    await getDocs(GET_LOGIN_DATA).then(snapshot => snapshot.docs.map(message => CURRENT_GUST_USER_DATA.push(message.data())))

    return {
        props : {
            serverSideData : {
             messageData : JSON.stringify(messageArray),
             CURRENT_GUST_USER_DATA : JSON.stringify(CURRENT_GUST_USER_DATA),
             USERS_LOGIN_DATA : JSON.stringify(USERS_LOGIN_DATA)
            }
        },
        revalidate : 1
    }
}