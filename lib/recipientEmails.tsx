export const RecipientEmails = (dataBaseEmail : string | undefined | null, loginEmail : []) =>
{
    return  loginEmail.filter(emails => emails !== dataBaseEmail)[0]
}