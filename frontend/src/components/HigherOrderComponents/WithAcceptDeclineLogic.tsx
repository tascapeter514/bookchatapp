import { useAcceptInviteMutation, useDeclineInviteMutation } from "../../slices/userDataApiSlice"
import { ComponentType } from "react"
import { Invitation } from "../../types"


interface WithAcceptDeclineProps {
    invitation: Invitation
}

interface InjectedProps {
    handleAccept: () => void,
    handleDecline: () => void,
    isAccepting: boolean,
    isDeclining: boolean,
    isAcceptError: boolean,
    isDeclineError: boolean
}


const WithAcceptDeclineLogic = (
    WrappedComponent: ComponentType<InjectedProps & WithAcceptDeclineProps>
): ComponentType<WithAcceptDeclineProps> => {
    
    return function WithAcceptDeclineLogicWrapper(props: WithAcceptDeclineProps) {

        const { invitation } = props

        const [acceptInvite, {isLoading: isAccepting, isError: isAcceptError}] = useAcceptInviteMutation()
        const [declineInvite, {isLoading: isDeclining, isError: isDeclineError}] = useDeclineInviteMutation()

        const handleAccept = () => acceptInvite(invitation.id)
        const handleDecline = () => declineInvite(invitation.id)

        const injectedProps: InjectedProps = {
            handleAccept,
            handleDecline,
            isAccepting,
            isDeclining,
            isAcceptError,
            isDeclineError
        }

        return <WrappedComponent {...props} {...injectedProps} />

    }

}

export default WithAcceptDeclineLogic


