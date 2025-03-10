import './InviteModal.css'
import { Ref, useState } from 'react'
import SearchFilter from '../SearchFilter/SearchFilter'



interface InviteModalProps {
    openImageModal: () => void,
    closeImageModal: () => void,
    InviteRef: Ref<HTMLDialogElement>

}


const InviteModal = ({openImageModal, closeImageModal, InviteRef }: InviteModalProps) => {

    const [searchValue, setSearchValue] = useState('')

    return (
        <dialog className='invite-modal'>
            <h3>Invite a user to your bookclub</h3>
            <hr />
            <section className='invite-user-container'>
                <SearchFilter
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                
            </section>
        </dialog>
    )

}

export default InviteModal