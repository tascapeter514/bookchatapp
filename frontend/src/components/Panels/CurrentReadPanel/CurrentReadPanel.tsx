import './CurrentRead.css'
import Header from '../../Headers/Header/Header'
import { useGetPollsQuery } from '../../../slices/pollApiSlice'
import Button from '../../Buttons/Button/Button'


interface Props {
    bookclubId: number
}


const CurrentReadPanel = ({bookclubId}: Props) => {

    const {data, isLoading, isError, error} = useGetPollsQuery(bookclubId)

    console.log('poll data:', data)


    return (
        <div className="current-read-panel">
            <Header>Current Read</Header>
            <div className="active-poll">
                <Button>Vote</Button>
                <Button>See Results</Button>
            </div>
            
                                    
        </div>
    )
}

export default CurrentReadPanel