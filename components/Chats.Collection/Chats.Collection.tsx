import * as EmailValidator from 'email-validator';
import {Chats_Collection_Container , Header , Body} from "./Chats.Collection.style";
import LogoutIcon from '@mui/icons-material/Logout';
import {Avatar , Button} from "@mui/material";
import {db , auth} from "../../config/Firebase";
import {signOut} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, addDoc, getDocs} from "@firebase/firestore";
import {useState} from "react"
import {ChatsMessage} from "../Chats.Message/Chats.Message";
import {ChatsLiveSearch} from "../Chats.LiveSearch/Chats.LiveSearch";
import {useSelector , useDispatch} from "react-redux";
import {RESET_STATUS} from "../../redux/reducer/Chats.Reducer";


import {useEffect , useLayoutEffect} from "react";
import ChatsReducer, {FETCH_CHAT_DATA} from "../../redux/reducer/Chats.Reducer";
import {AnyAction} from "redux";
import {RootState, useAppDispatch} from "../../redux/store/store";



export const ChatsCollection = ({SERVER_SIDE_DATA_BASE_CHATS_USERS} : {SERVER_SIDE_DATA_BASE_CHATS_USERS : any}) =>
{
    const {DATA_BASE_CHATS_USERS  , DATA_BASE_LOGIN_USERS , STATUS} = useSelector((state : any) => state?.ChatsReducer)

    const [user] = useAuthState(auth)

    const [searchUserInput , setSearchUserInput] = useState<string>('')

    const dispatch = useDispatch()


    const existChat = !!DATA_BASE_CHATS_USERS?.find((value : any) => value.users.includes(searchUserInput))
    const existUsersOnDatabase = !!DATA_BASE_LOGIN_USERS?.find((value : any) => value.email === searchUserInput)

    const startNewChat = () =>
    {
        if (searchUserInput!== auth.currentUser?.email && !existChat && EmailValidator.validate(searchUserInput) && existUsersOnDatabase)
        {
            addDoc(collection(db , 'USERS_CHAT') ,{users : [auth.currentUser?.email  , searchUserInput] , createTime : new Date().getTime()})
        }
        dispatch(RESET_STATUS())
        setSearchUserInput('')
    }



    let render ;

    if (STATUS === 'pending')
    {
        render = SERVER_SIDE_DATA_BASE_CHATS_USERS?.filter((chats: any) => chats.users.includes(user?.email))
            ?.map((usersInChat: any) => <ChatsMessage key={Math.random()} id={usersInChat.id} usersInChat={usersInChat}/>)
    }
    if (STATUS === 'success')
    {
        render = DATA_BASE_CHATS_USERS?.filter((chats: any) => chats.users.includes(user?.email))
            ?.map((usersInChat: any) => <ChatsMessage key={Math.random()} id={usersInChat.id} usersInChat={usersInChat}/>)
    }


    return (
        <Chats_Collection_Container>

            <Header>
                <Avatar sx={{width : '3rem',height : '3rem'}} src={user?.photoURL as string}>{user?.displayName?.slice(0,1)}</Avatar>
                <p className='text-white text-xl font-bold'>CHATS</p>
                <LogoutIcon onClick={()=> signOut(auth)} className='text-white'/>
            </Header>

            <Body>

                <input value={searchUserInput} placeholder='start new chat ...' className='placeholder:text-purple-500 w-9/12 my-3 p-1 font-bold text-purple-500 bg-transparent border-b-2 border-purple-700 outline-none'
                       onChange={(e) => setSearchUserInput(e.target.value)}/>

                <ChatsLiveSearch searchUser={searchUserInput}/>

                <Button
                    variant="contained"
                    size={'small'}
                    color={'secondary'}
                    onClick={startNewChat}>start</Button>

                {render}

                {SERVER_SIDE_DATA_BASE_CHATS_USERS?.length === 0 && <p className='text-white mt-11 font-bold'>Welcome , start chat with u friends</p>}

            </Body>

        </Chats_Collection_Container>
    )
}