import styled from "styled-components";
import {auth} from "../../config/Firebase";
import {SingIn_Container , SingIn_Button} from "./Login.Style";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";


export const Login = () =>
{

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const signIn = () => signInWithGoogle([] , {prompt : 'select_account'})

    return (
        <SingIn_Container>
            <p className='text-xl font-bold'>welcome to solo message</p>
            <button onClick={signIn} className={SingIn_Button}> sing in with google</button>
        </SingIn_Container>
    )
}

