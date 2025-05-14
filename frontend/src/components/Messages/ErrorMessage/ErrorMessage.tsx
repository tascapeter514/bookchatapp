import './ErrorMessage.css'

interface Props {

    children: string

}

 const ErrorMessage = ({children}: Props) => {

    console.log('error message string:', children)

    return(
        <p className='error-message' data-testid='error-message'>{children}</p>
    )


}

export default ErrorMessage