import { SetStateAction, Dispatch, useRef, useState } from 'react'
import CreateButton from '../../common/Buttons/CreateButton/CreateButton'
import PostModal from '../../common/Modals/PostModal/PostModal'
import './BookclubButton.css'


interface Props {
    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}

const BookclubButton = ({activeTab, setActiveTab}: Props) => {


    const bookclubRef = useRef<HTMLDialogElement>(null)
    const [activePanel, setActivePanel] = useState(false);
    const openBookclubModal = () => bookclubRef.current?.showModal()



    return(
            <> 
                <hr className='navbar-line-break' />
                
                <button 
                    className={`bookclub-button ${activeTab === 3 ? 'active' : ''}`}
                    onClick={ () => setActiveTab(3)}
                    
                >
                    
                    Bookclubs
                </button>
                <CreateButton onClick={openBookclubModal}>Bookclub</CreateButton>
                {/* <PostModal
                    ref={bookclubRef}
                    setResults={setUserBookclubs}
                /> */}
            

            </>
        

    )
}

export default BookclubButton


