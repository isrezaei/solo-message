import {ChatsRooms} from "../components/Chats.Rooms/Chats.Rooms";
import {getDocs , query , doc , collection , orderBy} from "@firebase/firestore";
import {db} from "../config/Firebase";


const serverRender = () =>
{
    return (
        <ChatsRooms/>
    )
}
export default serverRender




//
// export const getServerSideProps = async ({params} : any) =>
// {
//
//    const selectQuery = query(collection(db , 'USERS_CHAT' , params.id , 'CHAT_BETWEEN_USERS') )
//
//     // console.log(selectQuery)
//
//     // const docsMessage = []
//     //
//     // await getDocs(selectQuery).then(snapshot => snapshot.docs.map(message => docsMessage.push(message.data())))
//     //
//     //
//     // console.log(docsMessage)
//
//     return {
//         props : {
//
//         }
//     }
// }