import Head from 'next/head'
import {useEffect} from "react";
import type { NextPage } from 'next'
import {auth, db} from "../config/Firebase";
import {Login} from "../components/Login/Login";
import {useAuthState} from 'react-firebase-hooks/auth';
import {ChatsCollection} from "../components/Chats.Collection/Chats.Collection";
import {doc, setDoc, serverTimestamp, collection, getDocs, query, orderBy} from "@firebase/firestore";
import styled from "styled-components";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useDispatch, useSelector} from "react-redux";
import {FETCH_CHAT_DATA , FETCH_lOGIN_DATA} from "../redux/reducer/Chats.Reducer";
import {RootState} from "../redux/store/store";
import {useAppDispatch} from "../redux/store/store";
import {useRouter} from "next/router";

export const Home = ({DATA_BASE_CHATS_USERS}: {DATA_BASE_CHATS_USERS : any}) => {


    const router = useRouter()

    const [user, loading , error] = useAuthState(auth);


    const CHATS_STATUS = useSelector((state : RootState) => state.ChatsReducer.STATUS)

    const dispatch = useAppDispatch()


    useEffect(()=> {

        user && setDoc(doc(db , 'USERS_LOGIN' , user.uid) , {
            name : user.displayName,
            photo : user.photoURL,
            email : user.email,
            login : serverTimestamp()
        })

    } , [user])


    useEffect(()=> {
        if (CHATS_STATUS === 'idle')
        {
            dispatch(FETCH_CHAT_DATA())
            dispatch(FETCH_lOGIN_DATA())
        }
    } , [CHATS_STATUS , dispatch])


    const selectQuery = query(collection(db , `USERS_CHAT/${user?.email}/CHAT_BETWEEN_USERS`) , orderBy('timeStamp' , 'asc'))
    const [snapshot] = useCollectionData(selectQuery)

    console.log(snapshot)

    useEffect(() : any => {

        const currentTime = new Date().getTime()

        const lastMessageFromGuest = snapshot?.filter(msgData => {
            if (user?.email !== msgData.email) return msgData.timeStamp < currentTime
        })?.sort((a : any , b : any) => b.timeStamp - a.timeStamp)

        if (lastMessageFromGuest && snapshot?.length !== 0)
        {
            const {email , name , photo , text , timeStamp} = lastMessageFromGuest[0]

            Notification.requestPermission(permission => {
                if (permission === 'granted')
                {
                    return new Notification(`You have new message from ${name}` , {
                        body : text,
                        data : email,
                        image : photo
                    })
                }
                if (permission === 'denied')
                {
                    alert('we need access to notify for new message :)))')
                }
            })
        }

    } , [snapshot , user?.email])



    let render ;

    if (user)
    {
        render = <ChatsCollection SERVER_SIDE_DATA_BASE_CHATS_USERS = {DATA_BASE_CHATS_USERS}/>
    }
    if (!user)
    {
        render = <Login/>
    }


    return (
        <>
            <Head>
                <title>Solo Message</title>
            </Head>

            <Home_Container>
                {loading ? <p className='text-lg'>Loading ...</p> : render}
            </Home_Container>
        </>
    )
}

export default Home



const Home_Container = styled.div`
  width: 100%;
  height: 100vh;
  background: aliceblue;
  place-items: center;
`



export const getServerSideProps = async () =>
{
    let DATA_BASE_CHATS_USERS : any = []
    await getDocs(collection(db , 'USERS_CHAT')).then(snapShot => snapShot.docs.map(value => DATA_BASE_CHATS_USERS.push({id : value.id , ...value.data()})))
    return {
        props : {
            DATA_BASE_CHATS_USERS
        }
    }
}