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

):ComponentType<P & WithAsyncProps & {children?: React.ReactNode}> => {

    return function WithAsyncWrapper(props: P & WithAsyncProps & {children?: React.ReactNode}) {

        const { isLoading, isError, error, ...rest } = props
        

        console.log('isLoading:', isLoading)
        console.log('with async error:', error)
        console.log(typeof error)

        if (isLoading) {
            return (
                <WrappedComponent {...rest as P}>
                    <LoadSpinner />
                </WrappedComponent>
            )
        }

        
        if (error) {
            console.log('error conditional fires')
            return (
                <WrappedComponent {...rest as P}>
                    <ErrorMessage>{error}</ErrorMessage>
                </WrappedComponent> 
            )
            
            
        }

        

        return(

            <WrappedComponent {...rest as P}/>

        )

    }



}

export default WithAsync