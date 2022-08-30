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
                <button onClick={signInWithGoogle} type='button' className='btn btn-outline-light'>sign in with google</button>
            </LoginPanel>
        </Container>
    )
}


const Container = styled.div`

  width: 100vh;
  background: whitesmoke;
`
const LoginPanel = styled.div`
  width: 10vw;
  height: 15vw;
  background: #424242;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 480px) {
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`