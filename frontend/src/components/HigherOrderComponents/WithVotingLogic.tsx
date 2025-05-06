import { useState } from "react"
import { ComponentType } from "react"
import { useVoteMutation } from "../../slices/pollApiSlice"
import { VoteRequest } from "../../types"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Poll } from "../../types"

interface WithVotingProps {
    poll: Poll
}

interface InjectedProps {

    handleSelection: (id: number) => void,
    handleSubmitVote: () => void,
    isLoading: boolean,
    isError: boolean,
    successMessage: string,
    error: string

}



const WithVotingLogic = (
    WrappedComponent: ComponentType<InjectedProps & WithVotingProps>
): ComponentType<WithVotingProps> => {

    
    return function WithVotingLogicWrapper(props: WithVotingProps) {


        const [successMessage, setSuccessMessage] = useState<string>('')
        const [error, setError] = useState<string>('')



        const { poll } = props
        const { user } = useSelector((state: RootState) => state.auth)

        const [selection, setSelection] = useState(0)
        const handleSelection = (id: number) => setSelection(id)

        const [vote, {isLoading, isError} ] = useVoteMutation()

        const handleSubmitVote = async () => {

            const voteRequestData: VoteRequest = {
                choice: selection,
                user: user.id,
            }

            try {

                const response = await vote({data: voteRequestData, pollId: poll.id}).unwrap()

                console.log('vote response:', response)

                if (response?.message) {
                    setSuccessMessage(response.message)
                } else {
                    throw new Error("There was a problem in casting your vote")
                }



            } catch(err: any) {
                console.error(err)
                const message = 
                err?.data.message ||
                err?.data?.vote ||
                'An unexpected error occurred while casting your vote'

                setError(message)
            }


        }

        const injectedProps: InjectedProps = {

            handleSelection,
            handleSubmitVote,
            isLoading,
            isError,
            error,
            successMessage


        }

        return <WrappedComponent {...props} {...injectedProps}/>

    }

}

export default WithVotingLogic