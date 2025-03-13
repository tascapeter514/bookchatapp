import './BookclubPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
// import {useParams } from 'react-router-dom'
import { Bookclub, Bookshelf } from '../../types'
import { userData } from '../../components/common/Context/UserContext/UserContext'
import { bookclubData } from '../../components/common/Context/BookclubContext/BookclubContext'
import BookshelfPanel from '../common/BookshelfPanel/BookshelfPanel'
import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import SubNavbar from './components/SubNavbar/SubNavbar'
import TopFacade from './components/TopFacade/TopFacade'
// import SearchBooksModal from '../common/BookshelfPanel/components/SearchBooksModal/SearchBooksModal'
import Tabs from './components/Tabs/Tabs'

const BookclubPage = () => {

    const { userBookclubs } = userData()

    const { bookclub, bookshelves, parameters, setBookshelves } = bookclubData()

    const [activeBookshelf, setActiveBookshelf] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0)
    const [subNav, setSubNav] = useState(false)
    const [newBookshelf, setNewBookshelf] = useState<string>('')
    
    const [deleteBookshelf, setDeleteBookshelf] = useState<string>('')

    const tabContents = ['Bookshelves', 'Current Read']
    
   
    const [isMember, setIsMember] = useState(false)
    

    console.log('BOOKCLUB DATA:', bookclub)


    
    const deleteTitle = async (book_id: string) => {

        console.log('delete title check')

        try {
            const response = await axios.delete(`http://localhost:8000/api/book/delete/${book_id}`, {
                data: {
                    bookshelf_id: deleteBookshelf
                }
            })

            if (response.status == 200) {
                console.log(response.status)
                setBookshelves(prevBookshelves => 
                    prevBookshelves.map(bs => 
                        bs.bookshelf_id == deleteBookshelf ?
                        {...bs, titles: bs.titles?.filter(title => title.title_id !== book_id)} : bs
                    )
                
                )

            } else {
                console.error("Your book delete request encountered an error:", response.statusText)
            }

            

        } catch(err) {
            console.log('Your delete request failed to go through:', err)
        }


    }
// MIGRATE DELETE TO BOOKSHELF PANEL
    const panels = [
        <BookshelfPanel 
            activeBookshelf={activeBookshelf} 
            bookshelves={bookshelves} 
            deleteTitle={deleteTitle}
            // selectedBook={newBookId}
            setBookshelves={setBookshelves}
            setDeleteBookshelf={setDeleteBookshelf} 
        />,
        <CurrentReadPanel />
    ]
    const PanelComponent = () => panels[activeTab]

    const handleNewBookshelf = (e: string) => {
        console.log(e)
        setNewBookshelf(e)
    }

    useEffect(() => {
        setIsMember(() => {
            return  userBookclubs.map((userBookclub: Bookclub) => userBookclub.bookclub_id).some(userBookclubId => userBookclubId === parameters.id)
        })

        const lastVisited = new Date().toISOString()
        localStorage.setItem(`lastVisited/${parameters.id}`, lastVisited)

    }, [userBookclubs])


    const addBookshelf = async (formData: FormData): Promise<void> => {
        console.log('form data:', formData.get('bookshelfName'))

        const bookshelfObject: Bookshelf = {
            bookshelf_id: uuidv4(),
            name: String(formData.get('bookshelfName') || ''),
            bookclub_id: parameters.id,
            titles: [],


        }

        axios.post('http://localhost:8000/api/bookclub/addBookshelf', bookshelfObject)
            .then(response => {
                setBookshelves(prev => [...(prev || []), response.data])
                console.log('bookshelf data response:', response.data)
                setNewBookshelf('')
            })
            .catch(error => console.log('Your bookshelf was not created:', error))

        
    }

  


    console.log('BOOKSHELVES DATA:', bookshelves)

    return(
            <div className='bookclub-container'>
                {isMember && (
                    <div className="bookclub-content-wrapper">
                        <TopFacade id={parameters.id ?? ''} bookclub={bookclub}></TopFacade>
                        <div className="tabs-wrapper">
                            <hr />
                            
                            <div className="tabs-bar-wrapper">
                                <Tabs
                                    subNav={subNav}
                                    setSubNav={setSubNav} 
                                    contents={tabContents} 
                                    setActiveTab={setActiveTab} 
                                    activeTab={activeTab}
                                >
                                </Tabs>
                               
                               
                                
                            </div>
                            <div 
                                className={`subnav-container ${subNav ? 'active' : ''}`}

                            >
                                <SubNavbar 
                                    subNav={subNav} 
                                    bookshelves={bookshelves}
                                    setActiveBookshelf={setActiveBookshelf}
                                    addBookshelf={addBookshelf}
                                    handleNewBookshelf={handleNewBookshelf}
                                    newBookshelf={newBookshelf}
                                    
                                >
                                </SubNavbar>
                            </div>

                           
                        </div>
                        <div className="bookclub-panels-container">
                            <PanelComponent />
                        </div>

                    </div>
                )}

                {!isMember && (
                    <div>
                        <h1>We're sorry.</h1>
                        <p>You must be a member to view the book club.</p>
                    </div>
                ) }
                </div>
        
    )
}


export default BookclubPage


