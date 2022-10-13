
export const FilterGuestEmail = (CURRENT_USER : string | unknown , CHATS_DATA_SNAPSHOT : any) =>
{
    return  CHATS_DATA_SNAPSHOT.users?.filter((items : string) => CURRENT_USER !== items)[1]
}