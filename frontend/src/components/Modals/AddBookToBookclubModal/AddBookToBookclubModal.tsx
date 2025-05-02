import { useRef } from 'react'
import DropdownMapper from '../../Mappers/DropdownMapper/DropdownMapper'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { MapperData } from '../../../types'
import './AddBookToBookclubModal.css'
import Button from '../../Buttons/Button/Button'



interface Props {
    bookclubData: MapperData[],
    handleSelection: (id: number) => void,
    // handleAddBookToBookclub: () => void,
    handleGetUserBookclubs: () => Promise<void>,
    isGettingBookclubs: boolean,
    isGetBookclubsError: boolean,

}

const AddBookToBookclubModal = ({
    bookclubData,
    handleSelection,
    handleGetUserBookclubs,
    isGettingBookclubs,
    isGetBookclubsError

}: Props) => {



    const modalRef = useRef<HTMLDialogElement>(null)
    const closeModal = () => modalRef.current?.close()

    const openModal = () => {
        handleGetUserBookclubs()
        modalRef.current?.showModal()
    }

    console.log('bookclub data modal:', bookclubData)

    return(
        <>
            <button
                onClick={openModal}
                className='add-book-to-bookClub-btn'
            >
                Add to Bookclub
            </button>
            <dialog className='add-book-to-bookclub-dialog'ref={modalRef}>
                {isGettingBookclubs && (<div>Loading...</div>)}
                {isGetBookclubsError && <ErrorMessage>There is a problem with fetching your bookclubs</ErrorMessage>}
                {bookclubData.length > 0 && (
                    <>
                        <h3>Add this book to your bookclub</h3>
                        <hr />
                        <DropdownMapper
                            dispatch={handleSelection}
                            data={bookclubData}
                            dataType='Bookclubs'

                         />
                  
               
                
                        <div className="button-wrapper">
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button>Add</Button>
                        </div>
                    </>
                )}
                

            </dialog>

        </>


    )
}

export default AddBookToBookclubModal

  {/* <main className="bookclub-results-content">
                        <div className="suggested-search-results">
                            
                            
                            
                        </div>
                       
                         </main> */}

{/* <aside className='bookclub-bookshelves'>
{currentBookclub && currentBookclub.bookshelves !== undefined  ? 
    currentBookclub.bookshelves.length > 0 ? (
        currentBookclub.bookshelves.map((bookshelf, index) => {
            {return <li key={index} className='bookshelf-result'>
                <label htmlFor={bookshelf.name}>{bookshelf.name}</label>
                <input 
                    type="radio" 
                    className='bookshelf-input' 
                    id={bookshelf.name}
                    name='bookshelfGroup'
                    checked={currentBookshelf?.bookshelf_id === bookshelf.bookshelf_id} 
                    onClick={() => setCurrentBookshelf(bookshelf)}/>
            </li> }
        })
    ) : (<span>No bookshelves for this bookclub</span>)
    : 'No Bookclub Selected'}
</aside> */}



