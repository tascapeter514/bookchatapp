import './ActivePoll.css'
import { useRef } from 'react'
import Button from '../Buttons/Button/Button'
import { Poll } from '../../types'



interface Props {
    poll: Poll
}


const ActivePoll = ({poll}: Props) => {

    const voteRef = useRef<HTMLDialogElement>(null)
    const openVote = () => voteRef.current?.showModal()
    const closeVote = () => voteRef.current?.close()


    const handleSubmitVote = () => {
        console.log('submit vote')
    }

    return(
        <div className="active-poll">
            <Button onClick={openVote}>Vote</Button>
            <Button>See Results</Button>

            <dialog className='vote-dialog' ref={voteRef}>


            <div className="button-wrapper">
                <Button type='button' onClick={closeVote}>Cancel</Button>
                <Button type='submit' onClick={handleSubmitVote}>Create</Button>
            </div>

            </dialog>
        </div>
    )

}

export default ActivePoll