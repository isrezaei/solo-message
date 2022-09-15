import {Avatar} from "@mui/material";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../config/Firebase";
import {useRouter} from "next/router";


export const ChatsMessage = ({usersInChat , id} : {usersInChat : any , id : string}) =>
{
    const [user] = useAuthState(auth)
    const gustUser = usersInChat?.users.filter((email : any) => email !== user?.email)

    const redirect = useRouter()

    return (
        <div key={Math.random()} onClick={()=> redirect.push(`${id}`)}
             className='flex justify-start gap-3 bg-neutral-700 text-white items-center w-10/12 rounded-xl my-3 p-2 cursor-pointer'>
            <Avatar/>
            <p>{gustUser}</p>
        </div>
    )
}