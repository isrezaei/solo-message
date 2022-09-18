import {collection , onSnapshot} from "@firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../config/Firebase";
import {useEffect, useState} from "react";
import {db} from "../../config/Firebase";
import {Avatar} from "@mui/material";
import {useDebounce} from "./useDebounce";
import {DocumentData} from "@firebase/firestore";
import {useRouter} from "next/router";


export const ChatsLiveSearch = ({searchUser} : {searchUser : string}) =>
{
    const [user] = useAuthState(auth)
    const [resultSearch , setResultSearch] = useState<DocumentData[]>([])

    const loginUser = collection(db , 'USERS_LOGIN')
    const [snapshot] = useCollection(loginUser)
    const loginUserSnapShot = snapshot?.docs.map(users => ({id : users.id ,...users.data()}))

    const {debounce} = useDebounce(searchUser)
    useEffect(()=> {

        console.log(debounce?.length)

       const findUserOnDatabase = loginUserSnapShot?.filter((users : any) => users.email !== user?.email)
           .filter((user: any) => user.email.split(" ").join("").toLowerCase().includes(debounce?.split(" ").join("").toLowerCase()))

        if (debounce?.length === 0)return setResultSearch([])
        if (findUserOnDatabase)return setResultSearch(findUserOnDatabase)

    } , [debounce])

    const router = useRouter()

    const render = resultSearch?.map((result : any) => {

        return (
            <div key={Math.random()} onClick={()=> router.push(result.id)} className='w-full flex justify-evenly items-center bg-neutral-500'>
                <Avatar src={result.photo as string}>{result?.name.slice(0 , 2)}</Avatar>
                <div className='w-9/12 bg-neutral-700 rounded-lg text-white text-sm p-2 '>
                    {result?.name}
                    <p className='text-[.8rem]'>{result?.email}</p>
                </div>
            </div>
        )
    })


    return (
        <>
            {resultSearch?.length > 0 && <div className='w-9/12 min-h-[5rem] p-2 mb-5 bg-neutral-500 flex justify-start rounded-b-2xl items-start overflow-y-scroll scrollbar-hide'>{render}</div>}
        </>
    )
}