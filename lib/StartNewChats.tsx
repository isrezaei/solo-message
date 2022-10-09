import {useSelector} from "react-redux";
import {auth, db} from "../config/Firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import * as EmailValidator from 'email-validator';
import {useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {addDoc, collection} from "@firebase/firestore";

export const StartNewChats = (searchUserInput :string , setSearchUserInput : Function ) =>
{


}