import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "@firebase/auth";
import {auth} from "../Firebase";
import moment from "moment";
import {Avatar} from "@mui/material";

export const Message = ({messageData , serverSide}) =>
{

    const [hostUser] = useAuthState(auth)


    const SenderReceiver = hostUser.email === messageData.hostUserEmail ? Sender : Receiver
    const avatar = hostUser.email === messageData.hostUserEmail ?
        <div className='d-flex justify-content-end  position-absolute bottom-0 end-0 m-1'>
            <Avatar src={hostUser.photoURL}/>
        </div> :
        <div className='d-flex justify-content-start position-absolute bottom-0 end-0 m-1'>
            <Avatar src={messageData.photoURL}/>
        </div>

    // console.log(serverSide)
    console.log(messageData)

    return (

            <SenderReceiver>
                {avatar}
                <p className='lh-sm fw-semibold'>{messageData.message}</p>
                <p className='mt-3'>{messageData && moment(messageData?.timeStamp).format('LT')}</p>
            </SenderReceiver>

    )
}




const Sender = styled.div `
  width: 15vw;
  height: auto;
  background: beige;
  margin: 1vw 1vw 0vw auto;
  padding: .5vw;
  position: relative;
  

  @media screen and (max-width: 480px) {
    width: 50vw;
    padding: 1vw 3vw;
    margin: 3vw 3vw 0vw auto;
    border-radius: 2vw;
  }
`

const Receiver = styled.div`
  width: 15vw;
  height: auto;
  background: #cbcbcb;
  padding: 1vw 3vw;
  margin: 1vw auto 0 1vw;
  position: relative;

  @media screen and (max-width: 480px) {
    width: 50vw;
    padding: 1vw 3vw;
    margin: 3vw auto 0 3vw;
    border-radius: 2vw;
  }

`