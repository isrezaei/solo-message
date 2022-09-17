import {useCollectionData} from "react-firebase-hooks/firestore";
import {db} from "../config/Firebase";
import {collection} from "@firebase/firestore";
import {getDocs} from "@firebase/firestore";

export const FilterGuestEmail = (chatsEmail : [] , user : any) =>
{
    return chatsEmail.filter(Emails => Emails !== user?.email)[0]
}