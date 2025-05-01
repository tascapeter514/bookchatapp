import './PollVoteModal.css'
import {  useRef, useState } from 'react'
import Button from '../../Buttons/Button/Button'
import { Poll } from '../../../types'
import RadioButtonsMapper from '../../HigherOrderComponents/RadioButtonsMapper/RadioButtonsMapper'




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
        <div className="active-poll">
            <Button onClick={openVote}>Vote</Button>
            <Button>See Results</Button>

            <dialog className='vote-dialog' ref={voteRef}>
                <h4>Choose a book</h4>
               {/* {pollData.map((choice) => {

                const inputId = `choice-${choice.id}`



                return(

                    <li className='choice-list-element' key={choice.id} >
                        <label htmlFor={choice.name} className='choice-label'>{choice.name}</label>
                        <input 
                            type="radio" 
                            id={inputId}
                            value={choice.id} 
                            className='choice-input'
                            name='choiceGroup'
                            onChange={(e) => handleOnChange(e.target.value)}
                        />
                    
                    </li>

                )
               })} */}

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

