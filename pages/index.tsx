import Head from 'next/head'
import {useEffect} from "react";
import type { NextPage } from 'next'
import {auth, db} from "../config/Firebase";
import {Login} from "../components/Login/Login";
import {useAuthState} from 'react-firebase-hooks/auth';
import {ChatsCollection} from "../components/Chats.Collection/Chats.Collection";
import {doc, setDoc, serverTimestamp, collection, getDocs, query, orderBy, where} from "@firebase/firestore";
import styled from "styled-components";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useDispatch, useSelector} from "react-redux";
import {FETCH_CHAT_DATA, FETCH_lOGIN_DATA, RESET_STATUS} from "../redux/reducer/Chats.Reducer";
import {RootState} from "../redux/store/store";
import {useAppDispatch} from "../redux/store/store";
import {useRouter} from "next/router";

export const Home = ({DATA_BASE_CHATS_USERS}: {DATA_BASE_CHATS_USERS : any}) => {


    const [CURRENT_USER, loading , error] = useAuthState(auth);


    const CHATS_STATUS = useSelector((state : RootState) => state.ChatsReducer.STATUS)
    const USERS_CHATS = useSelector((state :RootState) => state.ChatsReducer.DATA_BASE_CHATS_USERS)


    const dispatch = useAppDispatch()


    const selectQuery = collection(db , `USERS_CHAT`)
    const [snapshot] = useCollectionData(selectQuery)


    useEffect(()=> {
        CURRENT_USER && setDoc(doc(db , 'USERS_LOGIN' , CURRENT_USER.uid) , {
            name : CURRENT_USER.displayName,
            photo : CURRENT_USER.photoURL,
            email : CURRENT_USER.email,
            login : serverTimestamp()
        })
    } , [CURRENT_USER])


    useEffect(()=> {
        if (CHATS_STATUS === 'idle')
        {
            dispatch(FETCH_CHAT_DATA())
            dispatch(FETCH_lOGIN_DATA())
        }
    } , [CHATS_STATUS , dispatch])


    //!when we have new massage from guest in database , redux thunk should be rerender and the new message is displayed
    useEffect(()=> {
        if (snapshot) dispatch(RESET_STATUS())
    } , [dispatch , snapshot])




    let render ;

    if (CURRENT_USER)
    {
        render = <ChatsCollection SERVER_SIDE_DATA_BASE_CHATS_USERS = {DATA_BASE_CHATS_USERS}/>
    }
    if (!CURRENT_USER)
    {
        render = <Login/>
    }



    // const [USER_LOGIN_EMAIL_SNAPSHOT] = useCollectionData(collection(db , 'USERS_LOGIN'))
    // const FILTER_GUEST_USER_FROM_LOGIN = USER_LOGIN_EMAIL_SNAPSHOT?.filter(items => items.email !== CURRENT_USER?.email)[0]?.email
    //
    //
    //
    // const CURRENT_USERS_CHAT : any = USERS_CHATS?.sort((a : any , b : any) => b?.createTime - a?.createTime)[0]
    //
    //
    // const SELECT_GUEST_MESSAGE = query(collection(db , `USERS_CHAT/${CURRENT_USERS_CHAT?.id}/CHAT_BETWEEN_USERS`),
    //     where('email' , '=='  , `${FILTER_GUEST_USER_FROM_LOGIN}`))
    //
    // const [GUEST_USER_SNAPSHOT] = useCollectionData(SELECT_GUEST_MESSAGE)
    //
    // console.log(GUEST_USER_SNAPSHOT && GUEST_USER_SNAPSHOT[0])
    //
    // useEffect(()=> {
    //
    //     if (GUEST_USER_SNAPSHOT?.length)
    //     {
    //         const {name = '' , photo = '' , text = '' , email = ''} = GUEST_USER_SNAPSHOT.sort((a , b) => b.timeStamp - a.timeStamp)[0]
    //
    //         Notification.requestPermission().then(permission => {
    //             if (permission === 'granted') new Notification(`You have new message from ${name}` , {
    //                 body :text,
    //                 image :photo,
    //                 data : email
    //             })
    //             if (permission === 'denied') alert('we need access to notify for new message :)))')
    //         })
    //     }
    //
    // } , [GUEST_USER_SNAPSHOT])



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