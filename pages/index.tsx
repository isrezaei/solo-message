import Head from 'next/head'
import {useEffect} from "react";
import type { NextPage } from 'next'
import {auth, db} from "../config/Firebase";
import {Login} from "../components/Login/Login";
import {useAuthState} from 'react-firebase-hooks/auth';
import {ChatsCollection} from "../components/Chats.Collection/Chats.Collection";
import {doc, setDoc , serverTimestamp} from "@firebase/firestore";
import styled from "styled-components";

const Home: NextPage = (props) => {

    const [user, loading , error] = useAuthState(auth);

    let render ;

    if (loading)
    {
        render = <h1>Loading...</h1>
    }
    if (!user)
    {
        render = <Login/>
    }

    if (user)
    {
        render = <ChatsCollection/>
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
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet"/>

            </Head>


            <Home_Container>
                {render}
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