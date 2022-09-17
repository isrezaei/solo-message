import * as EmailValidator from 'email-validator';
import {Chats_Collection_Container , Header , Body} from "./Chats.Collection.style";
import LogoutIcon from '@mui/icons-material/Logout';
import {Avatar , Button} from "@mui/material";
import {db , auth} from "../../config/Firebase";
import {signOut} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, addDoc} from "@firebase/firestore";
import {useState} from "react"
import {ChatsMessage} from "../Chats.Message/Chats.Message";
import {ChatsLiveSearch} from "../Chats.LiveSearch/Chats.LiveSearch";


export const ChatsCollection = () =>
{

    const [searchUser , SetSearchUser] = useState<string>('')

    const [user] = useAuthState(auth)

    const [usersLoginsSnapshot] = useCollection(collection(db , 'USERS_LOGIN'))
    const [usersChatSnapshot , loading] = useCollection(collection(db , 'USERS_CHAT'))


    //check users exist in chats 2 point 2 Array , for preventing push duplicate guest user
    const chatsSnapshot = usersChatSnapshot?.docs.map(items => ({id : items.id , ...items.data()}))
    const existChat = !!chatsSnapshot?.find((value : any) => value.users.includes(searchUser))

    //check users exit in database for chat with his
    const usersSnapshot = usersLoginsSnapshot?.docs.map(snapshot => snapshot.data())
    const existUsersOnDatabase = !!usersSnapshot?.find(usersLogin => usersLogin.email === searchUser)


    const startNewChat = () =>
    {
        if (searchUser!== user?.email && !existChat && EmailValidator.validate(searchUser) && existUsersOnDatabase)
        {
            addDoc(collection(db , 'USERS_CHAT') ,{users : [user?.email , searchUser]})
        }

        SetSearchUser('')
    }



    let render ;

    if (loading)
    {
        render = <p className='text-white text-lg mt-11'>Loading your chats ...</p>
    }
    if (!loading)
    {
        render = chatsSnapshot?.filter((chats: any) => chats.users.includes(user?.email))?.map((usersInChat: any) => <ChatsMessage key={Math.random()} id={usersInChat.id} usersInChat={usersInChat}/>)
    }


    return (
        <Chats_Collection_Container>

            <Header>
                <Avatar sx={{width : '3rem',height : '3rem'}} src={user?.photoURL as string}>{user?.displayName?.slice(0,1)}</Avatar>
                <p className='text-white text-xl font-bold'>CHATS</p>
                <LogoutIcon onClick={()=> signOut(auth)} className='text-white'/>
            </Header>

            <Body>

                <input value={searchUser} placeholder='start new chat ...' className='placeholder:text-purple-500 w-9/12 my-3 p-1 font-bold text-purple-500 bg-transparent border-b-2 border-purple-700 outline-none'
                       onChange={(e) => SetSearchUser(e.target.value)}/>

                <ChatsLiveSearch searchUser={searchUser}/>

                <Button
                    variant="contained"
                    size={'small'}
                    color={'secondary'}
                    onClick={startNewChat}>start</Button>

                {render}

                {chatsSnapshot?.length === 0 && <p className='text-white mt-11 font-bold'>Welcome , start chat with u friends</p>}


            </Body>


        </Chats_Collection_Container>
    )
}