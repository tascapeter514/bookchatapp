import './ErrorMessage.css'

interface Props {

    children: string

}

 const ErrorMessage = ({children}: Props) => {

    return(
        <p className='error-message'>{children}</p>
    )


}

export default ErrorMessage