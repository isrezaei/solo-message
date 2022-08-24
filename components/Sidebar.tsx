import styled from "styled-components";
import {Avatar , Button} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';


export const Sidebar = () =>
{
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
                </div>
            </Header>
        </Container>
    )
}


const Container = styled.div`
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-items: start;
  align-items: center;
  background: #e8e8e8;
`
const Header = styled.div`
  width: 100%;
  height: 3vw;
  border-bottom: .2vw solid whitesmoke;
  padding: .8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`
