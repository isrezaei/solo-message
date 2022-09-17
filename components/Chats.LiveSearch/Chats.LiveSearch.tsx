import {collection , onSnapshot} from "@firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../config/Firebase";
import {useEffect, useState} from "react";
import {db} from "../../config/Firebase";
import {Avatar} from "@mui/material";


export const ChatsLiveSearch = ({searchUser} : {searchUser : string}) =>
{
    const [user] = useAuthState(auth)

    const [search , setSearch] = useState<any>([])

    const loginUser = collection(db , 'USERS_LOGIN')

    const [snapshot] = useCollection(loginUser)

    const loginUserSnapShot = snapshot?.docs.map(users => users.data())


    useEffect(()=> {

       const existUserInDatabase = loginUserSnapShot?.filter((users : any) => users.email !== user?.email).filter(user => user.email.split(" ").join("").toLowerCase().includes(searchUser.split(" ").join("").toLowerCase()))


        if (existUserInDatabase)
        {
            setSearch(existUserInDatabase)
        }
        if (searchUser.length === 0)
        {
            setSearch([])
        }

    } , [searchUser])


    const render = search?.map((result : any) => {

        return (
            <div key={Math.random()} className='w-full flex justify-evenly items-center bg-neutral-500'>
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
            {search?.length > 0 && <div className='w-9/12 min-h-[5rem] p-2 mb-5 bg-neutral-500 flex justify-start items-start overflow-y-scroll'>{render}</div>}
        </>
    )
}