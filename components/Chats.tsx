import {query , where} from "@firebase/firestore";
import {userCollection} from "../Firebase";
import {RecipientEmails} from "../lib/recipientEmails";
import {auth} from "../Firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import styled from "styled-components";
import {Avatar} from "@mui/material";
import {useRouter} from "next/router";

export const Chats = ({id , users} : {id : string , users : any}) => {

    const [authData] = useAuthState(auth)

    const router = useRouter()

    const findExistUsersInDatabase = query(userCollection , where('email' , '==' , RecipientEmails(authData?.email , users)))

    const [existUserData] = useCollection(findExistUsersInDatabase)

    const eachPersonInChatData = existUserData?.docs.map(eachPersonData => eachPersonData.data())

    const goToChat = () => router.push(id)

    return (
        <>
            {
                eachPersonInChatData?.map(data => {
                    return (
                        <Container key={data?.email} onClick={goToChat}>


                            {data?.photoUrl ?
                                <Avatar className='ms-2' src={data?.photoUrl}/>
                                :
                                <Avatar className='ms-2'>{data?.email[0]}</Avatar>
                            }

                            <p className='ms-2 text-white fw-bold fs-6'>{data?.email}</p>
                        </Container>
                    )
                })
            }
        </>
    )

}


const Container = styled.div`

  width: 90%;
  height: 4vw;
  background: #757575;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3vw;

  @media screen and (max-width: 480px)
  {
    height: 15vw;
  }

`