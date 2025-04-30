import { useAcceptInviteMutation, useDeclineInviteMutation } from "../../slices/userDataApiSlice"
import { ComponentType } from "react"


interface WithAcceptDeclineProps {
    inviteId: number
}


const WithAcceptDeclineLogic = <T extends WithAcceptDeclineProps>(WrappedComponent: ComponentType<T>) => {
    
    return function WithAcceptDeclineLogicWrapper(props: T) {

        const { inviteId } = props

        const [acceptInvite, {isLoading: isAccepting, isError: isAcceptError}] = useAcceptInviteMutation()
        const [declineInvite, {isLoading: isDeclining, isError: isDeclineError}] = useDeclineInviteMutation()

        const handleAccept = () => acceptInvite(inviteId)
        const handleDecline = () => declineInvite(inviteId)

        const logicProps = {
            handleAccept,
            handleDecline,
            isAccepting,
            isDeclining,
            isAcceptError,
            isDeclineError
        }

        return <WrappedComponent {...props} {...logicProps} />

    }

}

export default WithAcceptDeclineLogic


