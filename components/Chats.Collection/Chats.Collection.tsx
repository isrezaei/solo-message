import * as EmailValidator from 'email-validator';
import {Chats_Collection_Container , Header , Body} from "./Chats.Collection.style";
import LogoutIcon from '@mui/icons-material/Logout';
import {Avatar , Button} from "@mui/material";
import {TextField} from "@mui/material";
import {db , auth} from "../../config/Firebase";
import {signOut} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, addDoc} from "@firebase/firestore";
import {useState} from "react"
import {ChatsMessage} from "../Chats.Message/Chats.Message";

export const ChatsCollection = () =>
{

    const [searchUser , SetSearchUser] = useState<string>('')
    const [user] = useAuthState(auth)
    const [snapshot , loading] = useCollection(collection(db , 'USERS_CHAT'))

    const chats = snapshot?.docs.map(items => ({id : items.id , ...items.data()}))

    const existChat = !!chats?.find((value : any) => value.users.includes(searchUser))

    const startNewChat = () =>
    {
        if (searchUser!== user?.email && !existChat && EmailValidator.validate(searchUser))
        {
            addDoc(collection(db , 'USERS_CHAT') ,{users : [user?.email , searchUser]})
        }
    }



    let render ;

    if (loading)
    {
        render = <p className='text-white text-lg mt-11'>Loading your chats ...</p>
    }
    if (!loading)
    {
        render = chats?.filter((chats: any) => chats.users.includes(user?.email))?.map((usersInChat: any) => <ChatsMessage key={Math.random()} id={usersInChat.id} usersInChat={usersInChat}/>)
    }


    return (
        <Chats_Collection_Container>

            <Header>
                <Avatar sx={{width : '3rem',height : '3rem'}} src={user?.photoURL as string}>{user?.displayName?.slice(0,1)}</Avatar>
                <p className='text-white text-xl font-bold'>CHATS</p>
                <LogoutIcon onClick={()=> signOut(auth)} className='text-white'/>
            </Header>

            <Body>

                    <input placeholder='start new chat ...' className='placeholder:text-purple-500 w-9/12 my-3 p-1 font-bold text-purple-500 bg-transparent border-b-2 border-purple-700 outline-none'
                           onChange={(e) => SetSearchUser(e.target.value)}/>

                <Button
                    variant="contained"
                    size={'small'}
                    color={'secondary'}
                    onClick={startNewChat}>start</Button>

                {render}

            </Body>


        </Chats_Collection_Container>
    )
}