import Head from 'next/head'
import {useEffect} from "react";
import type { NextPage } from 'next'
import {auth, db} from "../config/Firebase";
import {Login} from "../components/Login/Login";
import {useAuthState} from 'react-firebase-hooks/auth';
import {ChatsCollection} from "../components/Chats.Collection/Chats.Collection";
import {doc, setDoc, serverTimestamp, collection} from "@firebase/firestore";
import styled from "styled-components";
import {useCollectionData} from "react-firebase-hooks/firestore";

const Home: NextPage = (props) => {

    const [user, loading , error] = useAuthState(auth);


    let render ;

    if (user)
    {
        render = <ChatsCollection/>
    }
    if (!user)
    {
        render = <Login/>
    }

    useEffect(()=> {
        user && setDoc(doc(db , 'USERS_LOGIN' , user.uid) , {
            name : user.displayName,
            photo : user.photoURL,
            email : user.email,
            login : serverTimestamp()
        })
    } , [user])


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