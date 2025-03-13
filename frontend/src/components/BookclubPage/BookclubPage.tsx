import './BookclubPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Bookclub, Bookshelf } from '../../types'
import { userData } from '../../components/common/Context/UserContext/UserContext'
import { bookclubData } from '../../components/common/Context/BookclubContext/BookclubContext'
import BookshelfPanel from '../common/BookshelfPanel/BookshelfPanel'
import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import SubNavbar from './components/SubNavbar/SubNavbar'
import TopFacade from './components/TopFacade/TopFacade'
import BookshelfProvider from '../common/Context/BookshelfContext/BookshelfContext'

import Tabs from './components/Tabs/Tabs'



const BookclubPage = () => {

    const { userBookclubs } = userData()
    const { bookclub, bookshelves, parameters, setBookshelves } = bookclubData()
    const [activeBookshelf, setActiveBookshelf] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0)
    const [showSubNav, setShowSubNav] = useState(false)
    const [newBookshelf, setNewBookshelf] = useState<string>('')
    const tabContents = [{name: 'Bookshelves', id: 0}, {name: 'Current Read', id: 1}]
    
   
    const [isMember, setIsMember] = useState(false)
    

    console.log('BOOKCLUB DATA:', bookclub)


    const panels = [
        <BookshelfPanel 
            activeBookshelf={activeBookshelf} 
            bookshelves={bookshelves}
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
                        <TopFacade></TopFacade>
                        <div className="tabs-wrapper">
                            <hr />
                            
                            <div className="tabs-bar-wrapper">
                                <Tabs
                                    showSubNav={showSubNav}
                                    setShowSubNav={setShowSubNav} 
                                    contents={tabContents} 
                                    setActiveTab={setActiveTab} 
                                    activeTab={activeTab}
                                >
                                </Tabs>
                               
                               
                                
                            </div>
                            <div 
                                className={`subnav-container ${showSubNav ? 'active' : ''}`}

                            >
                                <SubNavbar 
                                    subNav={showSubNav} 
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
                            <BookshelfProvider>
                                <PanelComponent />
                            </BookshelfProvider>
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


