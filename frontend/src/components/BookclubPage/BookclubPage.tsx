import './BookclubPage.css'
import { Dispatch } from 'react'
import { useReducer } from 'react'
import { Bookshelf } from '../../types'
import BookshelfTabs from '../BookshelfTabs/BookshelfTabs'
// import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel'
// import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import { useParams } from 'react-router-dom'
import { useGetBookclubDataQuery } from '../../slices/bookclubApiSlice'
import BookclubHeader from '../BookclubHeader/BookclubHeader'
import tabsReducer, { TabAction } from '../../reducers/tabsReducer'
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import DashboardNav from '../DashboardNav/DashboardNav'
import mobileNavReducer from '../../reducers/mobileNavReducer'
import NavbarDivider from '../Dividers/NavbarDivider/NavbarDivider'



interface Props {
    dispatchTabs: Dispatch<TabAction>
}

const CurrentReadButton = ({dispatchTabs}: Props) => {

    return(
        <a 
            className='current-read-tab' 
            href={'#currentRead'} 
            onClick={() => dispatchTabs({type: 'SET_ACTIVE_TAB', payload: 'bookshelfTab'})}
        >
            Current Read
        </a>
    )

}


const BookclubPage = () => {


    const { id } = useParams()
    const {data, isLoading, error, isError}= useGetBookclubDataQuery(Number(id))
    const bookclub = data?.bookclub
    const bookshelves = data?.bookshelves
    const [bookclubTabs, dispatchTabs] = useReducer(tabsReducer, {activeTab: '', activeBookshelf: '', showNav: false})
    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})

    console.log('bookclub data:', data)

    
    return(

        
        <div className='bookclub-container'>
            {bookclub && (
                <>
                    <BookclubHeader bookclub={bookclub}/>
                    <hr />
                    <div className="bookclub-content">
                        <DashboardNav mobileNav={mobileNav}>
                            <CurrentReadButton dispatchTabs={dispatchTabs} />
                            <BookshelfButton>
                                <NavbarDivider />
                                <BookshelfTabs userTabs={bookclubTabs} dispatchUserTabs={dispatchTabs} bookshelves={bookshelves ?? []}/>
                            </BookshelfButton>
                        </DashboardNav>
                    </div>
                </>
            )}
        </div>
    )
}


export default BookclubPage




