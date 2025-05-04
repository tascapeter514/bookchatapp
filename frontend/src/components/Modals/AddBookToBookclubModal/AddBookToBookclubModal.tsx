import { useRef } from 'react'
import { Bookclub } from '../../../types'
import DropdownMapper from '../../Mappers/DropdownMapper/DropdownMapper'
// import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { MapperData } from '../../../types'
import './AddBookToBookclubModal.css'
import Button from '../../Buttons/Button/Button'
import RadioButtonsMapper from '../../RadioButtonsMapper/RadioButtonsMapper'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { selectBookclub, selectBookshelf, selectDefault } from '../../../slices/addBookToBookclubSlice'

interface Props {
    bookclubData: Bookclub[],
    handleAddBookToBookclub: (bookshelfId: number, bookclubId: number) => Promise<void>,
    handleGetUserBookclubs: () => Promise<void>,
    // isGettingBookclubs: boolean,
    // isGetBookclubsError: boolean,



}

const AddBookToBookclubModal = ({
    bookclubData,
    handleGetUserBookclubs,
    handleAddBookToBookclub,
    // isGettingBookclubs,
    // isGetBookclubsError,


}: Props) => {

    const dispatch = useDispatch()
    const { bookclubDataState } = useSelector((state: RootState ) => state.bookclubDataState)

    const modalRef = useRef<HTMLDialogElement>(null)
    const openModal = () => {
        handleGetUserBookclubs()
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        modalRef.current?.close()
        dispatch(selectDefault())
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
                {/* {isGettingBookclubs && (<div>Loading...</div>)}
                {isGetBookclubsError && <ErrorMessage>There is a problem with fetching your bookclubs</ErrorMessage>} */}
                {bookclubData.length > 0 && (
                    <>
                        <h3>Add this book to your bookclub</h3>
                        <hr />
                        <DropdownMapper
                            dispatch={dispatch}
                            data={bookclubData}
                            action={selectBookclub}
                            dataType='Bookclubs'

                         />
                         <RadioButtonsMapper
                                dispatch={dispatch}
                                action={selectBookshelf}
                                dataType='Bookshelves'
                                data={
                                    bookclubData
                                        .find((bookclub: Bookclub) => bookclub.id === bookclubDataState.selectedBookclub)
                                        ?.bookshelves
                                        ?.map((bookshelf: MapperData) => ({id: bookshelf.id, name: bookshelf.name})) || []
                                } 
                            />
                         
                        <div className="button-wrapper">
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button 
                                onClick={() => {
                                    const {selectedBookclub, selectedBookshelf } = bookclubDataState
                                    if (!selectedBookclub || !selectedBookshelf) {
                                        alert("Please select both a bookclub and a bookshelf")
                                        return
                                    }
                                    handleAddBookToBookclub(selectedBookshelf, selectedBookclub)
                                }}
                            >Add
                            </Button>
                        </div>
                    </>
                )}
                

            </dialog>

        </>


    )
}

export default AddBookToBookclubModal




