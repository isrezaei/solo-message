import styled from "styled-components";


export const Chats_Collection_Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #231e1e;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const Header = styled.div`
  width: 100%;
  height: 5rem;
  background: #7900a2;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Body = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: #282828;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
`