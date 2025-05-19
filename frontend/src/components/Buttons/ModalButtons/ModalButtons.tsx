import './ModalButtons.css'
import Button from '../Button/Button'


interface Props {
    closeModal: () => void,
    submitHandler: (id: number) => Promise<void>,
    submitButtonText?: string
}

const ModalButtons = ({closeModal, submitHandler, submitButtonText}: Props) => {

    return (
        <div className="button-wrapper">
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={() => submitHandler}>{submitButtonText ? submitButtonText : 'Submit'}</Button>
        </div>
    )
}

export default ModalButtons