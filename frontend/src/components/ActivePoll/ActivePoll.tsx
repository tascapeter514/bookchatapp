import './ActivePoll.css'
import { useRef } from 'react'
import Button from '../Buttons/Button/Button'
import { Poll } from '../../types'
import { Book } from '../../types'



interface Props {
    poll: Poll
}


const ActivePoll = ({poll}: Props) => {

    const voteRef = useRef<HTMLDialogElement>(null)
    const openVote = () => voteRef.current?.showModal()
    const closeVote = () => voteRef.current?.close()
    const pollData = [poll.bookOne, poll.bookTwo, poll.bookThree]


    const handleSubmitVote = () => {
        console.log('submit vote')
    }

    console.log("active poll data:", poll)

    return(
        <div className="active-poll">
            <Button onClick={openVote}>Vote</Button>
            <Button>See Results</Button>

            <dialog className='vote-dialog' ref={voteRef}>
                <h4>Choose a book</h4>
               {pollData.map((choice) => {
                return(

                    <li className='choice-list-element' key={choice.id} >
                        <label htmlFor={choice.name} className='choice-label'>{choice.name}</label>
                        <input type="radio" id='book-one' value={choice.name} className='choice-input'/>
                    
                    </li>

                )
               })}



                <div className="button-wrapper">
                    <Button type='button' onClick={closeVote}>Cancel</Button>
                    <Button type='submit' onClick={handleSubmitVote}>Vote</Button>
                </div>
            </dialog>
        </div>
    )

}

export default ActivePoll

{/* <label htmlFor={poll.bookTwo.name}>{poll.bookTwo.name}</label>
<input type="radio" id='book-two' value={poll?.bookTwo?.name}/>
<label htmlFor={poll.bookThree.name}>{poll.bookThree.name}</label>
<input type="radio" id='book-three' value={poll?.bookThree?.name}/> */}



{/* <li 
                    className='book-result-listElement'
                    key={bookResult.id}
                    >
                        <label className='book-result-label' htmlFor={bookResult.name}>{bookResult.name}</label>
                        <input 
                            type="radio"
                            name='bookResultsGroup'
                            // checked={newBookId === bookResult.id}
                            onChange={() => bookDispatch({type: 'CHECK_BOOK', payload: bookResult.id})}
                            className='book-result-input'  
                        />
                    </li> */}