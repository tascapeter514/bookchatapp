import './BookclubPage.css'
import { useReducer } from 'react'
import DashboardMain from '../DashboardMain/DashboardMain'
import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel'
import CreateBookclubBookshelfModal from '../Modals/CreateBookclubBookshelfModal/CreateBookclubBookshelfModal'
import BookshelfTabs from '../BookshelfTabs/BookshelfTabs'
import CurrentReadPanel from '../Panels/CurrentReadPanel/CurrentReadPanel'
import { useParams } from 'react-router-dom'
import { useGetBookclubDataQuery } from '../../slices/bookclubApiSlice'
import BookclubHeader from '../BookclubHeader/BookclubHeader'
import tabsReducer from '../../reducers/tabsReducer'
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import DashboardNav from '../DashboardNav/DashboardNav'
import mobileNavReducer from '../../reducers/mobileNavReducer'
import NavbarDivider from '../Dividers/NavbarDivider/NavbarDivider'
import CurrentReadButton from '../TabButtons/CurrentReadButton/CurrentReadButton'
import InviteButton from '../TabButtons/InviteButton/InviteButton'



const BookclubPage = () => {


    const { id } = useParams()
    const {data }= useGetBookclubDataQuery(Number(id))
    const bookclub = data?.bookclub
    const bookshelves = data?.bookshelves
    const books = bookshelves?.flatMap(bookshelf => bookshelf.books)
    const [bookclubTabs, dispatchTabs] = useReducer(tabsReducer, {activeTab: '', activeBookshelf: '', showNav: false})
    const [mobileNav] = useReducer(mobileNavReducer, {open: false, isExiting: false})

    console.log('bookclub data:', data)

    console.log('bookshelves:', bookshelves)

    
    return(

        
        <div className='bookclub-container'>
            {bookclub && (<BookclubHeader bookclub={bookclub}/>)}
            {bookclub && (
                <div className='bookclub-content'>
                    <DashboardMain>
                        {bookclubTabs.activeTab === 'currentReadPanel' && <CurrentReadPanel bookclubId={bookclub.id}  />}

                        {bookclubTabs.activeTab === 'bookshelfPanel' && <BookshelfPanel tabs={bookclubTabs} bookshelves={bookshelves ?? []} id={bookclub.id} />}
                            
                            

                    </DashboardMain>
                    <DashboardNav mobileNav={mobileNav}>
                        <CurrentReadButton dispatchTabs={dispatchTabs} tabs={bookclubTabs} books={books ?? []} bookclubId={bookclub.id}/>
                        <InviteButton bookclub={bookclub}/>
                        <BookshelfButton>
                            <NavbarDivider />
                            <BookshelfTabs tabs={bookclubTabs} dispatchTabs={dispatchTabs} bookshelves={bookshelves ?? []}/>
                            <CreateBookclubBookshelfModal bookclub={bookclub}/>
                        </BookshelfButton>
                    </DashboardNav>
                </div>
            )}
        </div>
    )
}


export default BookclubPage




