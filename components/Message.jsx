export const Message = ({message}) =>
{
    console.log(message)

    return (
        <div>
            <h1>{message.text}</h1>
        </div>
    )
}