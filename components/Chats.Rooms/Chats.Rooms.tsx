import {Chats_Rooms_Container , Header , Body , EachMessage , EachAvatar , Footer} from "./Chats.Rooms.Style";
import {useRouter} from "next/router";
import {
    useCollectionData,
    useDocumentDataOnce,
    useDocumentData,
    useCollectionOnce,
    useDocument,
    useCollection, useCollectionDataOnce
} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, query, orderBy, addDoc, serverTimestamp, doc, getDoc, where} from "@firebase/firestore";
import {auth} from "../../config/Firebase";
import {db} from "../../config/Firebase";
import {Input} from "@mui/material";
import {Button} from "@mui/material";
import {Avatar} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useState} from "react";
import TimeAgo from 'timeago-react'
import moment from "moment";
import {FilterGuestEmail} from "../../lib/FilterGuestEmail";




export const ChatsRooms = ({serverSideMessage , serverSideUsersLoginData} : {serverSideMessage : any , serverSideUsersLoginData : any}) =>
{

    const [user] = useAuthState(auth)
    const [inputText , setInputText] = useState<string>('')

    const router = useRouter()

    const selectQuery = query(collection(db , `USERS_CHAT/${router.query.id}/CHAT_BETWEEN_USERS`) , orderBy('timeStamp' , 'asc'))

    const [snapshot , loading , error] = useCollectionData(selectQuery)


    const MessageRender = () =>
    {
        if (snapshot)
        {
            //get message from firebase
            return snapshot?.map((msgData : any) => {
                return (
                    <EachMessage condition={{msgData : msgData?.email , user : user?.email}} key={Math.random()}>
                            <EachAvatar src={msgData?.photo as string}>{msgData?.name?.slice(0,2).toUpperCase()}</EachAvatar>
                            <p className='w-32 text-sm'>{msgData?.text}</p>
                            <p className='text-[.8rem] !absolute bottom-1'>{moment(msgData?.timeStamp?.toDate()?.getTime())?.format('LT')}</p>
                    </EachMessage>
                )
            })
        }

        //get message data from server side for first render
        return serverSideMessage.map((msgData : any) => {
            return (
                <EachMessage condition={{msgData : msgData?.email , user : user?.email}} key={Math.random()}>
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
                photo : user?.photoURL,
                name : user?.displayName,
                email : user?.email,
                timeStamp : serverTimestamp()
            })
        }
        setInputText('')
    }


    const HeaderChat = serverSideUsersLoginData.filter((loginUsers : any) => loginUsers.email !== user?.email)?.map((guest : any) => {
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