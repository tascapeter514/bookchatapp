import { ComponentType } from "react"
import LoadSpinner from "../LoadSpinner/LoadSpinner"
import ErrorMessage from "../Messages/ErrorMessage/ErrorMessage"



interface WithAsyncProps {
    isLoading: boolean,
    isError: boolean,
    error: string
}

const WithAsync = <P extends object>(
    WrappedComponent: ComponentType<P>

):ComponentType<P & WithAsyncProps> => {

    return function WithAsyncWrapper(props: P & WithAsyncProps) {

        const { isLoading, isError, error, ...rest } = props
        

        console.log('isLoading:', isLoading)

        if (isLoading) {
            return (
                <WrappedComponent {...rest as P}>
                    <LoadSpinner />
                </WrappedComponent>
            )
        }

        
        if (props.isError) {
            return <ErrorMessage>{props.error}</ErrorMessage>
        }

        

        return(

            <WrappedComponent {...rest as P}/>

        )

    }



}

export default WithAsync