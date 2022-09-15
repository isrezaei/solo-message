import {Chats_Rooms_Container , Header , Body , Footer} from "./Chats.Rooms.Style";
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




export const ChatsRooms = () =>
{

    const [user] = useAuthState(auth)
    const [inputText , setInputText] = useState<string>('')

    const router = useRouter()

    const selectQuery = query(collection(db , `USERS_CHAT/${router.query.id}/CHAT_BETWEEN_USERS`) , orderBy('timeStamp' , 'asc'))

    const [snapshot , loading , error] = useCollectionData(selectQuery)

    const message = snapshot?.map(value => {

        return (
            <div key={Math.random()}>

                <div className={`
                w-52 min-h-[4rem] px-2 py-1 my-8 relative text-white h-auto rounded-xl flex flex-col justify-between item-center
                 ${user?.email === value.email ? 'bg-purple-700 ml-auto' : 'bg-neutral-500  mr-auto'}`}>

                    <Avatar className='absolute bottom-1 right-[.3rem]' src={value.photo as string}>{value.name?.slice(0,2).toUpperCase()}</Avatar>
                    <p className='w-32 text-sm'>{value.text}</p>
                    <p className='text-[.8rem] mt-5'>{moment(value.timeStamp?.toDate().getTime()).format('LT')}</p>
                </div>

            </div>
        )
    })

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


    const [chat] = useDocumentData(doc(db , `USERS_CHAT/${router.query.id}`))
    const hostEmail = chat?.users?.filter((emails : any) => emails !== user?.email)[0]
    //*******

    const getHostCollection = hostEmail && query(collection(db , 'USERS_LOGIN') ,  where('email' , '=='  , hostEmail))

    const [HostData] = useCollectionDataOnce(getHostCollection)

    const HeaderChat = HostData?.map(host => {
        return (
            <div className={'w-full h-full flex flex-col justify-center items-center'} key={Math.random()}>
                <Avatar src={host?.photo}>{host?.name?.slice(0,2).toUpperCase()}</Avatar>
                <p className='font-bold text-[1rem] text-neutral-800'>{host?.name}</p>

                <div className='px-3 gap-1 flex justify-center items-center text-[.8rem] font-bold text-neutral-700'>
                    <p>Last Seen in</p>
                    <TimeAgo datetime={host?.login?.toDate().getTime()} live={true}/>
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
                {loading ? <p className='text-white font-bold text-xl'>loading...</p> :  message}
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