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


    return (

        <Container>
            <Header>
                <Avatar/>

                <div className='w-25 h-50 d-flex justify-content-evenly align-items-center'>
                    <Button>
                        <MessageOutlinedIcon/>
                    </Button>
                    <Button>
                        <MoreVertIcon/>
                    </Button>

                    <Button>
                       <p onClick={()=> signOut(auth)}>Logout</p>
                    </Button>

                </div>
            </Header>

            <Submit>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} className='w-75 bg-light border-0'/>
                <button onClick={createChats} type='button' className='btn btn-info h-75 d-flex justify-content-center align-items-center'>submit</button>
            </Submit>

            <Body>
                {showChat?.docs.map(  users => <Chats key={users.id} id={users.id} users={users.data().userChats}/>)}
            </Body>


        </Container>
    )
}


const Container = styled.div`
  width: 25vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-items: start;
  align-items: center;
  background: #e8e8e8;
`
const Header = styled.div`
  width: 80%;
  height: 3vw;
  border-bottom: .2vw solid whitesmoke;
  padding: .8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Submit = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Body = styled.div`
  width: 95%;
  height: 40vw;
  display: flex;
  margin-top: 1vw;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: blanchedalmond;

`
