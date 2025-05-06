import './PollResultsModal.css'
import { useRef, useState } from 'react'
import { PollResult } from '../../../types'
import { useGetPollResultsMutation } from '../../../slices/pollApiSlice'
import Button from '../../Buttons/Button/Button'
import BarChart from '../../BarChart/BarChart'


interface Props {
    pollId: number
}

const PollResultsModal = ({pollId}: Props) => {

    const resultsRef = useRef<HTMLDialogElement>(null)
    const openResults = () => resultsRef.current?.showModal()
    const closeResults = () => resultsRef.current?.close()

    const [getPollResults] = useGetPollResultsMutation()
    const [pollResults, setPollResults] = useState<PollResult[] | null>(null)

    const handleGetResults = async () => {
        console.log('handle get results')

        try {
            const response = await getPollResults(pollId)

            const remappedResults = response.data.map(({vote_count, ...rest}: any) => ({
                ...rest,
                voteCount: vote_count,
                
            }))


            setPollResults(remappedResults)

            


        } catch(err: any) {
            console.error(err)
        }
    }

    return (
        <div className='poll-results-modal'>
            <Button onClick={() => {
                openResults();
                handleGetResults();
            }}>See Results</Button>
            <dialog className='poll-results-dialog' ref={resultsRef}>
                <h4>See your results</h4>
                {pollResults && pollResults.length > 0 && (
                    <BarChart results={pollResults} />
                )}
                
                

                <Button onClick={closeResults}>Close</Button>
            </dialog>
        

        </div>
    )

}

export default PollResultsModal