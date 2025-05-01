import './PollVoteModal.css'
import {  useRef, useState } from 'react'
import Button from '../../Buttons/Button/Button'
import { Poll } from '../../../types'
import RadioButtonsMapper from '../../RadioButtonsMapper/RadioButtonsMapper'




interface Props {
    poll: Poll
}


const PollVoteModal = ({poll}: Props) => {

    const voteRef = useRef<HTMLDialogElement>(null)
    const openVote = () => voteRef.current?.showModal()
    const closeVote = () => voteRef.current?.close()
    const pollData = [poll.bookOne, poll.bookTwo, poll.bookThree]
    const [selection, setSelection] = useState(0)


    const handleOnChange = (id: number) => {
        
        console.log('selection:', id)
        setSelection(id)

    }


    const handleSubmitVote = () => {
        console.log('submit vote')
        console.log('selection:', selection)
    }

    console.log("active poll data:", poll)

    return(
        <div className="poll-vote-modal">
            <Button onClick={openVote}>Vote</Button>

            <dialog className='poll-vote-dialog' ref={voteRef}>
                <h4>Choose a book</h4>
               

               <RadioButtonsMapper 
                    dispatch={handleOnChange}
                    data={pollData}
               />
                
                <div className="button-wrapper">
                    <Button type='button' onClick={closeVote}>Cancel</Button>
                    <Button type='submit' onClick={handleSubmitVote}>Vote</Button>
                </div>
            </dialog>
        </div>
    )

}

export default PollVoteModal

