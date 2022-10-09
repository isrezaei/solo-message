import {createSlice , createAsyncThunk , createEntityAdapter} from "@reduxjs/toolkit";
import {collection} from "@firebase/firestore";
import {db} from "../../config/Firebase";
import {getDocs} from "@firebase/firestore";


export const FETCH_CHAT_DATA = createAsyncThunk('FETCH_CHAT_DATA' , async () => {

    let DATA_BASE_CHATS_USERS : any = []

    //*id:"VDiDmk3Arq1RAZKwKkyc" example Id
    //*users:['rezaeiism@yahoo.com', 'rezaeiism@gmail.com'] example between 2 person chats
    await getDocs(collection(db , 'USERS_CHAT'))?.then(snapShot => snapShot?.docs?.map(value => DATA_BASE_CHATS_USERS?.push({id : value.id , ...value.data()})))
    return DATA_BASE_CHATS_USERS
})


export const FETCH_lOGIN_DATA = createAsyncThunk('FETCH_lOGIN_DATA' , async () => {
    let DATA_BASE_LOGIN_USERS : any = []
    await getDocs(collection(db , 'USERS_LOGIN'))?.then(snapShot => snapShot?.docs?.map(value => DATA_BASE_LOGIN_USERS.push({id : value.id ,...value.data()})))
    return DATA_BASE_LOGIN_USERS
})



const chatsReducer = createSlice({

    name : 'GET_CHAT_DATA',
    initialState : {
        STATUS : 'idle',
        DATA_BASE_CHATS_USERS : [],
        DATA_BASE_LOGIN_USERS : []
    },

    reducers : {},

    extraReducers : (builder => {

        //? data base chat users array
        builder.addCase(FETCH_CHAT_DATA.pending , (state , action) =>{
            state.STATUS = 'pending'
        })
        builder.addCase(FETCH_CHAT_DATA.fulfilled , (state : any , action) =>{
            state.DATA_BASE_CHATS_USERS = action.payload
            state.STATUS = 'success'
        })
        builder.addCase(FETCH_CHAT_DATA.rejected , (state , action) =>{
            state.STATUS = 'reject'
        })

        //* data base login users array
        builder.addCase(FETCH_lOGIN_DATA.pending , (state , action) =>{
            state.STATUS = 'pending'
        })
        builder.addCase(FETCH_lOGIN_DATA.fulfilled , (state , action) =>{
            state.DATA_BASE_LOGIN_USERS = action.payload
            state.STATUS = 'success'
        })
        builder.addCase(FETCH_lOGIN_DATA.rejected , (state , action) =>{
            state.STATUS = 'reject'
        })
    })
})

export default chatsReducer.reducer
