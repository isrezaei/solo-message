import type {AppProps} from 'next/app'
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect} from "react";
import {addDoc,serverTimestamp} from "@firebase/firestore";
import {auth,userCollection} from "../Firebase";
import '../styles/globals.css'
import {Login} from "./Login";

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

  return <Component {...pageProps} />
}

export default MyApp
