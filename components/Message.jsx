import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "@firebase/auth";
import {auth} from "../Firebase";
import moment from "moment";

export const Message = ({messageData}) =>
{

    const [hostUser] = useAuthState(auth)


    const SenderReceiver = hostUser.email === messageData.hostUserEmail ? Sender : Receiver

    console.log(messageData)

    return (
        <SenderReceiver>
            <p className='lh-sm'>{messageData.message}</p>
            <p className='mt-3'>{messageData && moment(messageData?.timeStamp?.toDate()?.getTime()).format('LT')}</p>
        </SenderReceiver>
    )
}




const Sender = styled.div `
  width: 15vw;
  height: auto;
  background: beige;
  margin: 1vw 1vw 0vw auto;
  padding: .5vw;
`

const Receiver = styled.div`
  width: 15vw;
  height: auto;
  background: #e7844f;
  padding: .5vw;
  margin: 1vw auto 0 1vw;
  
`