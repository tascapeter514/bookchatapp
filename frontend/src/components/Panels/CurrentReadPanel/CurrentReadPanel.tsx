import './CurrentRead.css'
import Header from '../../Headers/Header/Header'
import { useGetPollsQuery } from '../../../slices/pollApiSlice'
import PollVoteModal from '../../Modals/PollVoteModal/PollVoteModal'
import SubHeader from '../../Headers/SubHeader/SubHeader'


interface Props {
    bookclubId: number
}


const CurrentReadPanel = ({bookclubId}: Props) => {

    const { data } = useGetPollsQuery(bookclubId)



    console.log('poll data:', data)
    console.log('poll ternary:', data ? true : false)


    return (
        <div className="current-read-panel">
            <Header>Current Read</Header>
            {data?.id ? 
                <>
                    <SubHeader>Poll in Progress</SubHeader>
                    <PollVoteModal poll={data}/>
                </> 
            : 
                <p>Start a poll!</p>
            }
            
            
            
                                    
        </div>
    )
}

export default CurrentReadPanel