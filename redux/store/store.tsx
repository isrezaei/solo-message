import {configureStore} from "@reduxjs/toolkit";
import ChatsReducer from "../reducer/Chats.Reducer";
import {useDispatch} from "react-redux";
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
    reducer : {
        ChatsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch