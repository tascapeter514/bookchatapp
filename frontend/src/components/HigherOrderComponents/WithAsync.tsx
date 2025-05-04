import { ComponentType } from "react"
import LoadSpinner from "../LoadSpinner/LoadSpinner"
import ErrorMessage from "../Messages/ErrorMessage/ErrorMessage"



interface WithAsyncProps {
    isLoading: boolean,
    isError: boolean,
    error: string
}

const WithAsync = (
    WrappedComponent: ComponentType<WithAsyncProps>

):ComponentType<WithAsyncProps> => {

    return function WithAsyncWrapper(props: WithAsyncProps) {

        if (props.isLoading) {
            return <LoadSpinner />
        }

        if (props.isError) {
            return <ErrorMessage>{props.error}</ErrorMessage>
        }

        return(

            <WrappedComponent {...props}/>

        )

    }



}

export default WithAsync