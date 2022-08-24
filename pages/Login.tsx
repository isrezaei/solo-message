import styled from "styled-components";
import {signInWithPopup} from "@firebase/auth";
import {auth , googleProvider} from "../Firebase";


export const Login = () =>
{

    const signInWithGoogle = () =>
    {
        signInWithPopup(auth , googleProvider)
    }


    return (
        <Container>
            <LoginPanel>
                <p className='text-bg-dark text-xl-center'>Login with Google</p>
                <button onClick={signInWithGoogle} type='button' className='btn btn-success'>sign in with google </button>
            </LoginPanel>
        </Container>
    )
}


const Container = styled.div`

  width: 100vh;
  display: grid;
  place-items: center;
  background: whitesmoke;
`
const LoginPanel = styled.div`
  width: 10vw;
  height: 15vw;
  background: gainsboro;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`