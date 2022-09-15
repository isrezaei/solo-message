import styled from "styled-components";

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
  background: #2f2f2f;
  padding: 0rem 1rem ;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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