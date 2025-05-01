import './CurrentRead.css'
import Header from '../../Headers/Header/Header'
import { useGetPollsQuery } from '../../../slices/pollApiSlice'
import WithVotingLogic from '../../HigherOrderComponents/WithVotingLogic'
import PollVoteModal from '../../Modals/PollVoteModal/PollVoteModal'
import SubHeader from '../../Headers/SubHeader/SubHeader'


interface Props {
    bookclubId: number
}

const PollVoteModalWithLogic = WithVotingLogic(PollVoteModal)


const CurrentReadPanel = ({bookclubId}: Props) => {

    const { data: poll } = useGetPollsQuery(bookclubId)



    console.log('poll data:', poll)
    


    return (
        <div className="current-read-panel">
            <Header>Current Read</Header>
            {poll?.id ? 
                <>
                    <SubHeader>Poll in Progress</SubHeader>
                    <PollVoteModalWithLogic poll={poll} />
                </> 
            : 
                <p>Start a poll!</p>
            }
            
            
            
                                    
        </div>
    )
}

export default CurrentReadPanel