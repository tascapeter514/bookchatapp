import './BookclubPage.css'
import { useReducer } from 'react'
import DashboardMain from '../DashboardMain/DashboardMain'
import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel'
import CreateBookclubBookshelfModal from '../Modals/CreateBookclubBookshelfModal/CreateBookclubBookshelfModal'
import BookshelfTabs from '../BookshelfTabs/BookshelfTabs'
import CurrentReadPanel from '../Panels/CurrentReadPanel/CurrentReadPanel'
import useBookclubData from '../../hooks/useBookclubData'
import BookclubHero from '../BookclubHero/BookclubHero'
import tabsReducer from '../../reducers/tabsReducer'
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import DashboardNav from '../DashboardNav/DashboardNav'
import mobileNavReducer from '../../reducers/mobileNavReducer'
import NavbarDivider from '../Dividers/NavbarDivider/NavbarDivider'
import CurrentReadButton from '../TabButtons/CurrentReadButton/CurrentReadButton'
import InviteButton from '../TabButtons/InviteButton/InviteButton'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import OpenUserMobileNav from '../Buttons/OpenUserMobileNav/OpenUserMobileNav'
import CloseUserMobileNav from '../Buttons/CloseUserMobileNav/CloseUserMobileNav'
import { UserIcon, CloseIcon } from '../Icons'
import ErrorMessage from '../Messages/ErrorMessage/ErrorMessage'



// const DashboardLayout = ({children}: ReactNode) => (
//     <div className='bookclub-dashboard-layout'>
//         {children} 
//     </div>

// )

const BookclubPage = () => {

    const {
        bookclub,
        bookshelves, 
        books, 
        isLoading, 
        isError, 
        error
    } = useBookclubData()

    const [bookclubTabs, dispatchTabs] = useReducer(tabsReducer, {activeTab: '', activeBookshelf: '', showNav: false})
    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})

    
    if (isLoading) return <LoadSpinner />
    if (isError) return <ErrorMessage>{error as string}</ErrorMessage>
    if(!bookclub) return null;

    
    return(

        
        <div className='bookclub-container'>
            <BookclubHero bookclub={bookclub}/>
            <div className="bookclub-dashboard-layout">
                <DashboardMain>
                    <OpenUserMobileNav mobileNav={mobileNav} navDispatch={navDispatch}><UserIcon aria-label='open bookclub mobile nav' /></OpenUserMobileNav>
                    {bookclubTabs.activeTab === 'currentReadPanel' && <CurrentReadPanel bookclubId={bookclub?.id} data-testid='bookclub-current-read-panel'  />}
                    {bookclubTabs.activeTab === 'bookshelfPanel' &&
                        <BookshelfPanel
                            data-testid='bookclub-bookshelf-panel'
                            tabs={bookclubTabs}
                            bookshelves={bookshelves ?? []}
                    />}
                </DashboardMain>
                <DashboardNav mobileNav={mobileNav}>
                    
                    <CloseUserMobileNav mobileNav={mobileNav} navDispatch={navDispatch}><CloseIcon aria-label='close bookclub mobile nav'/></CloseUserMobileNav>
                    <CurrentReadButton
                        dispatchTabs={dispatchTabs}
                        tabs={bookclubTabs}
                        books={books ?? []}
                        bookclubId={bookclub?.id}
                    />
                    <InviteButton bookclub={bookclub}/>
                    <BookshelfButton>
                        <NavbarDivider />
                        <BookshelfTabs
                            tabs={bookclubTabs}
                            dispatchTabs={dispatchTabs}
                            bookshelves={bookshelves ?? []}
                        />
                        <CreateBookclubBookshelfModal bookclub={bookclub}/>
                    </BookshelfButton>
                </DashboardNav>
            </div>
        </div>
    )
}


export default BookclubPage




