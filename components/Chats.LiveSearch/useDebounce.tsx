import {useState , useEffect} from "react";

export const useDebounce = (searchInputValue : string | null) =>
{
    const [debounce , setDebounce] = useState<string | null>('')

    useEffect(()=> {

        const timeOut = setTimeout(()=> setDebounce(searchInputValue) , 1000)
        return ()=> clearTimeout(timeOut)

    } , [searchInputValue])

    return {debounce}

}