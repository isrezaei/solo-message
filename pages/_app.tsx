import type {AppProps} from 'next/app'
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useLayoutEffect} from "react";
import {addDoc,serverTimestamp , setDoc ,doc} from "@firebase/firestore";
import {auth, db, userCollection} from "../Firebase";
import '../styles/globals.css'
import {Login} from "../components/Login";
import styled from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {

  const [authData , loading] = useAuthState(auth)

  useLayoutEffect(()=> {

    if (authData)
    {
      setDoc(doc(db , 'user' , authData.uid) , {
        email : authData.email ,
        photoUrl : authData.photoURL ,
        lastSeen : serverTimestamp()
      })
    }

  } , [authData])

  console.log(authData)


  if (loading) return 'Loading'

  if (!authData) return <Login/>


  return (
      <Container>
        <Component {...pageProps} />
      </Container>
  )
}

export default MyApp








const Container = styled.div `
  
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