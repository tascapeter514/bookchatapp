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



    console.log('poll data:', data)


    return (
        <div className="current-read-panel">
            <Header>Current Read</Header>
            {data ? 
                <>
                    <SubHeader>Poll in Progress</SubHeader>
                    <ActivePoll poll={data}/>
                </> 
            : 
                <p>Start a poll!</p>
            }
            
            
            
                                    
        </div>
    )
}

export default CurrentReadPanel