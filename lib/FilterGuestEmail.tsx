import {collection , getDocs} from "@firebase/firestore";
import {db} from "../config/Firebase";

export const FilterGuestEmail = async (hostEmail : string | unknown) =>
{
    let DATA_BASE_LOGIN_USERS : any = []

    await getDocs(collection(db, `USERS_LOGIN`)).then(snapShot => snapShot.docs.map(items => DATA_BASE_LOGIN_USERS.push({...items.data()})))

    console.log(DATA_BASE_LOGIN_USERS)

    return  DATA_BASE_LOGIN_USERS.filter((items : any) => items.email !== hostEmail)[0].email

}