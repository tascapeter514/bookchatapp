import './CurrentRead.css'
import Header from '../../Headers/Header/Header'
import { useGetPollsQuery } from '../../../slices/pollApiSlice'


interface Props {
    bookclubId: number
}


const CurrentReadPanel = ({bookclubId}: Props) => {

    const {data, isLoading, isError, error} = useGetPollsQuery(bookclubId)

    console.log('poll data:', data)


    return (
        <div className="currentRead-panel">
            <Header>Current Read</Header>
                                    
        </div>
    )
}

export default CurrentReadPanel