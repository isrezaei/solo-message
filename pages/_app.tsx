import type {AppProps} from 'next/app'
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect} from "react";
import {addDoc,serverTimestamp} from "@firebase/firestore";
import {auth,userCollection} from "../Firebase";
import '../styles/globals.css'
import {Login} from "./Login";
import styled from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {

  const [authData , loading] = useAuthState(auth)

  useEffect(()=> {

    if (authData)
    {
      addDoc(userCollection , {
        email : authData.email ,
        photoUrl : authData.photoURL ,
        lastSeen : serverTimestamp()
      })
    }

  } , [authData])


  if (loading) return 'Loading'
  if (!authData) return <Login/>


  return (

        <Component {...pageProps} />

  )
}

export default MyApp


const Container = styled.div `

  background: magenta;
  
  
  @media screen and (max-width: 480px)
  {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`