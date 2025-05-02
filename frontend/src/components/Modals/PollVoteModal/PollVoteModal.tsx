import './PollVoteModal.css'
import {  useRef } from 'react'
import Button from '../../Buttons/Button/Button'
import { Poll } from '../../../types'
import RadioButtonsMapper from '../../RadioButtonsMapper/RadioButtonsMapper'




interface Props {
    poll: Poll,
    handleSelection: (id: number) => void,
    handleSubmitVote: () => void,
    isVoting: boolean,
    isVoteError: boolean,
    successMessage: string

    
}


const PollVoteModal = ({
    poll, 
    handleSelection, 
    handleSubmitVote,
    isVoting,
    isVoteError,
    successMessage


}: Props) => {

    const voteRef = useRef<HTMLDialogElement>(null)
    const openVote = () => voteRef.current?.showModal()
    const closeVote = () => voteRef.current?.close()
    
   

    console.log("active poll data:", poll)

    return(
        <div className="poll-vote-modal">
            <Button onClick={openVote}>Vote</Button>

            <dialog className='poll-vote-dialog' ref={voteRef}>
                
                <h4>Cast your vote!</h4>
               

               <RadioButtonsMapper 
                    dispatch={handleSelection}
                    data={poll.pollChoices.map((choice) => ({
                        id: choice.id,
                        name: choice.book.name
                    }))}
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

