import {createStore , applyMiddleware , compose} from "redux"
import thunk from "redux-thunk";


// @ts-ignore
export const store = createStore('rootReducer' , applyMiddleware(thunk) )