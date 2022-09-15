import type {AppProps} from 'next/app'
import {GlobalStyle} from "../styles/Global.Style";
import '../styles/_app.css'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../config/Firebase";
import {Login} from "../components/Login/Login";
import {ChatsCollection} from "../components/Chats.Collection/Chats.Collection";

function MyApp({ Component, pageProps }: AppProps) {

    const [user, loading , error] = useAuthState(auth);

    // if (loading) return <h1>Loading...</h1>
    // if (!user) return <Login/>


    return (
      <>
        <GlobalStyle/>
        <Component {...pageProps} />
      </>

  )
}

export default MyApp



