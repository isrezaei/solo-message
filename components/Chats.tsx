import {query , where} from "@firebase/firestore";
import {userCollection} from "../Firebase";
import {RecipientEmails} from "../lib/recipientEmails";
import {auth} from "../Firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import styled from "styled-components";
import {Avatar} from "@mui/material";

export const Chats = ({id , users} : {id : string , users : any}) => {

    const [authData] = useAuthState(auth)

    const findExistUsersInDatabase = query(userCollection , where('email' , '==' , RecipientEmails(authData?.email , users)))

    const [existUserData] = useCollection(findExistUsersInDatabase)

    const eachPersonInChatData = existUserData?.docs.map(eachPersonData => eachPersonData.data())

    return eachPersonInChatData?.map(data => {

            return (
                <Container key={data.email}>


                    {data?.photoUrl ?
                        <Avatar src={data?.photoUrl}/>
                        :
                        <Avatar>{data?.email[0]}</Avatar>
                    }

                    <p>{data.email}</p>


                </Container>
            )
        })

}


const Container = styled.div`

  width: 90%;
  height: 4vw;
  background: aqua;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

`