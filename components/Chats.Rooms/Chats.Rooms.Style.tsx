import styled from "styled-components";
import {Avatar} from "@mui/material";

export const Chats_Rooms_Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #2c2c2c;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const Header = styled.div`

  width: 100%;
  height: 7rem;
  background: darkorchid;
`

export const Body = styled.div`

  width: 100%;
  height: 37rem;
  padding: 0rem 1rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const EachMessage = styled.div`
  width: 15rem;
  min-height: 5rem;
  padding: .3rem .5rem;
  position: relative;
  color: whitesmoke;
  border-radius: 1rem;
  align-items: flex-start;
  background: ${({condition} : {condition : any} ) => condition.msgData === condition.user ? '#7e57c2'  : '#616161'};
  margin: ${({condition} : {condition : any} ) => condition.msgData === condition.user ? '1rem 0rem 1rem auto' : '1rem auto 1rem 0'  };
`

export const EachAvatar = styled(Avatar)`
  position: absolute!important;
  bottom: .3rem;
  right: .4rem;
`


export const Footer = styled.div`

  width: 100%;
  height: 3rem;
  background: #333333;
  border-top: 1px solid #707070;
  padding: 2rem .8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

`