export const RecipientEmails = (hostEmail : string | undefined | null, chatArray : []) =>
{
    return  chatArray.filter(emails => emails !== hostEmail)[0]
}