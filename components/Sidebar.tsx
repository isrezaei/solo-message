import styled from "styled-components";
import * as EmailValidator from 'email-validator';
import {Avatar , Button} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import {chatCollection, auth, userCollection} from "../Firebase";
import {getDocs, where, query, addDoc, onSnapshot} from "@firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {useState} from "react";
import {Chats} from "./Chats";
import {signOut} from "@firebase/auth";



export const Sidebar = () =>
{
    const [email , setEmail] = useState<string>('')

    const [authData] = useAuthState(auth)

    const specificChat = query(chatCollection , where('userChats' , 'array-contains' , authData?.email))

    const [showChat] = useCollection(specificChat)


    const checkUserExist = () => !!showChat?.docs.find((doc) => doc.data().userChats.find((dataEmail : any) => dataEmail === email)?.length > 0)


    // console.log(!checkUserExist())

    const createChats = () =>
    {
        if (EmailValidator.validate(email) && !checkUserExist() && email !== authData?.email)
        {
            console.log('new users')
            return addDoc(chatCollection , {
                userChats : [authData?.email , email]
            })
        }
    }

    console.log(authData?.photoURL)

    return (

        <Container>
            <Header>

                <Avatar src={authData?.photoURL as any}/>

                <div className='w-75 h-50 d-flex justify-content-end align-items-center'>
                    <Button>
                        <MessageOutlinedIcon className='text-light'/>
                    </Button>

                    <Button>
                       <p className='text-light' onClick={()=> signOut(auth)}>Logout</p>
                    </Button>
                </div>
            </Header>

            <Submit>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} className='w-50 h-50  bg-light border-0 rounded-2'/>
                <button onClick={createChats} type='button' className='btn btn-outline-light h-50 d-flex justify-content-center align-items-center'>submit</button>
            </Submit>

            <Body>
                {showChat?.docs.map(  users => <Chats key={users.id} id={users.id} users={users.data().userChats}/>)}
            </Body>


        </Container>
    )
}


const Container = styled.div`
  width: 90vw;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-items: start;
  align-items: center;
  margin: auto;
  background: #424242;


  @media screen and (max-width: 480px) {
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }


`
const Header = styled.div`
  width: 100%;
  height: 3vw;
  border-bottom: .2vw solid whitesmoke;
  padding: .8vw;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 480px)
  {
    height: 20vw;
  }
  
`
const Submit = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 480px)
  {
    width: 100%;
    height: 15vw;
    background: #212121;
  }
  
`

const Body = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 1vw;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  //background: blanchedalmond;
  overflow-y: scroll;

  @media screen and (max-width: 480px)
  {
    margin-top: 5vw;
  }

`
