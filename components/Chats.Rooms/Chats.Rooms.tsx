import {Chats_Rooms_Container , Header , Body , EachMessage , EachAvatar , Footer} from "./Chats.Rooms.Style";
import {useRouter} from "next/router";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, query, orderBy, addDoc, updateDoc, doc, getDoc, where, getDocs} from "@firebase/firestore";
import {auth} from "../../config/Firebase";
import {db} from "../../config/Firebase";
import {Input} from "@mui/material";
import {Button} from "@mui/material";
import {Avatar} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useLayoutEffect, useState , useRef} from "react";
import TimeAgo from 'timeago-react'
import moment from "moment";

import {useUpdateEffect , useUnmount} from 'react-use';


export const ChatsRooms = ({serverSideMessage , serverSideUsersLoginData} : {serverSideMessage : any , serverSideUsersLoginData : any}) =>
{

    const [CURRENT_USER] = useAuthState(auth)
    const [inputText , setInputText] = useState<string>('')

    const router = useRouter()

    console.log(router)

    //*SELECT EXIST CHATS IN UNIQUE IDS
    const SELECT_ALL_CHATS_IN_UNIQUE_ID = query(collection(db , `USERS_CHAT/${router.query.id}/CHAT_BETWEEN_USERS`),
        orderBy('timeStamp' , 'asc'))
    const [CHATS_DATA_SNAPSHOT , loading , error] = useCollectionData(SELECT_ALL_CHATS_IN_UNIQUE_ID)
    //*

    //?GET GUEST USER EMAIL
    const [USER_LOGIN_EMAIL_SNAPSHOT] = useCollectionData(collection(db , 'USERS_LOGIN'))
    const FILTER_GUEST_USER_FROM_LOGIN = USER_LOGIN_EMAIL_SNAPSHOT?.filter(items => items.email !== CURRENT_USER?.email)[0].email
    //?
    

    //?GET NEW CHAT FROM GUEST FOR SHOWING NOTIFICATION
    const SELECT_GUEST_MESSAGE = query(collection(db , `USERS_CHAT/${router.query.id}/CHAT_BETWEEN_USERS`),
        where('email' , '=='  , `${FILTER_GUEST_USER_FROM_LOGIN}`))
    const [GUEST_USER_SNAPSHOT] = useCollectionData(SELECT_GUEST_MESSAGE)
    //?


    //?IT HAS THE TASK OF RENDERING THE (useUpdateEffect),THE VALUE CHANGES WHEN A NEW MESSAGE COMES FROM THE GUEST
    const [reRenderNotify , setReRenderNotify] = useState(0)
    //?

    //?SHALLOW COPY THAN CHATS_DATA_SNAPSHOT , BECAUSE IF YOU USE (CHATS_DATA_SNAPSHOT) DIRECTLY, THE CHRONOLOGICAL ORDER OF THE CHATS WILL BE MESSED UP!
    const CHATS_DATA_SNAPSHOT_COPY = CHATS_DATA_SNAPSHOT?.map(items => items)
    useEffect(()=> {

            if (CHATS_DATA_SNAPSHOT_COPY?.sort((a , b) => b.timeStamp - a.timeStamp)[0]?.email !== CURRENT_USER?.email)
            {

                //!
                updateDoc(doc(db , 'USERS_CHAT' , `${router.query.id}`) , {
                    createTime : new Date().getTime()
                })

               return setReRenderNotify(Math.random)
            }

    } , [CHATS_DATA_SNAPSHOT , CURRENT_USER?.email])
    //?

    //!FIRE NOTIFICATION WHEN WE HAVE NEW MESSAGE FROM THE GUEST
    useUpdateEffect(()  => {
            if (GUEST_USER_SNAPSHOT?.length)
            {
                const {name = '' , photo = '' , text = '' , email = ''} = GUEST_USER_SNAPSHOT.sort((a , b) => b.timeStamp - a.timeStamp)[0]
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') new Notification(`You have new message from ${name}` , {
                        body :text,
                        image :photo,
                        data : email
                    })
                    if (permission === 'denied') alert('we need access to notify for new message :)))')
                })
            }} , [reRenderNotify])
    //!


    const MessageRender = () =>
    {
        if (CHATS_DATA_SNAPSHOT)
        {
            //get message from firebase
            return CHATS_DATA_SNAPSHOT?.map((msgData : any) => {

                return (
                    <EachMessage condition={{msgData : msgData?.email , user : CURRENT_USER?.email}} key={Math.random()}>
                            <EachAvatar src={msgData?.photo as string}>{msgData?.name?.slice(0,2).toUpperCase()}</EachAvatar>
                            <p className='w-32 text-sm'>{msgData?.text}</p>
                            <p className='text-[.8rem] !absolute bottom-1'>{moment(msgData?.timeStamp)?.format('LT')}</p>
                    </EachMessage>
                )
            })
        }

        //get message data from server side for first render
        return serverSideMessage.map((msgData : any) => {
            return (
                <EachMessage condition={{msgData : msgData?.email , user : CURRENT_USER?.email}} key={Math.random()}>
                        <EachAvatar src={msgData?.photo as string}>{msgData?.name?.slice(0,2).toUpperCase()}</EachAvatar>
                        <p className='w-32 text-sm'>{msgData?.text}</p>
                        <p className='text-[.8rem] !absolute bottom-1'>{moment(msgData?.timeStamp)?.format('LT')}</p>
                </EachMessage>
            )
        })
    }


    const sendMessage = () =>
    {
        if (inputText)
        {
            addDoc(collection(db , `USERS_CHAT/${router.query.id}/CHAT_BETWEEN_USERS`) , {
                text : inputText,
                photo : CURRENT_USER?.photoURL,
                name : CURRENT_USER?.displayName,
                email : CURRENT_USER?.email,
                timeStamp : new Date().getTime()
            })
        }
        setInputText('')
    }


    const HeaderChat = serverSideUsersLoginData.filter((loginUsers : any) => loginUsers.email !== CURRENT_USER?.email)?.map((guest : any) => {
        return (
            <div className={'w-full h-full flex flex-col justify-center items-center'} key={Math.random()}>
                <Avatar src={guest?.photo}>{guest?.name?.slice(0,2).toUpperCase()}</Avatar>
                <p className='font-bold text-[1rem] text-neutral-800'>{guest?.name}</p>

                <div className='px-3 gap-1 flex justify-center items-center text-[.8rem] font-bold text-neutral-700'>
                    <p>Last Seen in</p>
                    <TimeAgo datetime={guest?.login?.nanoseconds} live={true}/>
                </div>
            </div>
        )
    })


    return (
        <Chats_Rooms_Container>
            <Header>
                {HeaderChat}
            </Header>
            <Body>
                <MessageRender/>
            </Body>
            <Footer>
                <Input placeholder="Type ..." color={'secondary'}  size={'small'} value={inputText} onChange={e => setInputText(e.target.value)}
                       sx={{
                           '& > :not(style)': { color : 'white' , borderBottom : '1px solid white'},
                       }}/>

                <Button onClick={sendMessage} variant="outlined" color={'secondary'} endIcon={<SendIcon />}>
                    Send
                </Button>
            </Footer>
        </Chats_Rooms_Container>
    )
}