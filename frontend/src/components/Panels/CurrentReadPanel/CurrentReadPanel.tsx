import './CurrentRead.css'
import Header from '../../Headers/Header/Header'
import { useGetPollsQuery } from '../../../slices/pollApiSlice'
import ActivePoll from '../../ActivePoll/ActivePoll'
import SubHeader from '../../Headers/SubHeader/SubHeader'


interface Props {
    bookclubId: number
}


const CurrentReadPanel = ({bookclubId}: Props) => {

    const {data, isLoading, isError, error} = useGetPollsQuery(bookclubId)

    const poll = data?.[0]

    console.log('poll data:', data)


    return (
        <div className="current-read-panel">
            <Header>Current Read</Header>
            {poll ? 
                <>
                    <SubHeader>Poll in Progress</SubHeader>
                    <ActivePoll poll={poll}/>
                </> 
            : 
                <p>Start a poll!</p>
            }
            
            
            
                                    
        </div>
    )
}

export default CurrentReadPanel