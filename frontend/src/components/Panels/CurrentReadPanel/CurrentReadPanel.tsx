import './CurrentReadPanel.css'
import Header from '../../Headers/Header/Header'
import { useGetPollsQuery } from '../../../slices/pollApiSlice'
import WithVotingLogic from '../../HigherOrderComponents/WithVotingLogic'
import PollVoteModal from '../../Modals/PollVoteModal/PollVoteModal'
import SubHeader from '../../Headers/SubHeader/SubHeader'
import WithAsync from '../../HigherOrderComponents/WithAsync'
import PollResultsModal from '../../Modals/PollResultsModal/PollResultsModal'


interface Props {
    bookclubId: number
}

const PollVoteModalWithLogic = WithVotingLogic(WithAsync(PollVoteModal))


const CurrentReadPanel = ({bookclubId, ...props}: Props) => {

    const { data: poll } = useGetPollsQuery(bookclubId)



    console.log('poll data:', poll)
    


    return (
        <div className="current-read-panel" {...props}>
            <Header>Current Read</Header>
            {poll?.id ? 
                <>
                    <SubHeader>Poll in Progress</SubHeader>
                    <PollVoteModalWithLogic poll={poll} />
                    <PollResultsModal pollId={poll.id}/>
                    
                    
                </> 
            : 
                <p>Start a poll!</p>
            }
            
            
            
                                    
        </div>
    )
}

export default CurrentReadPanel