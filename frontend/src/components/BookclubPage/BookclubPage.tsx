import './BookclubPage.css'
import {useState, useEffect, useRef} from 'react'
import {useParams } from 'react-router-dom'
import { Bookclub } from '../../types'
import { userData } from '../../components/common/UserContext'
import { SearchIcon } from '../common/Icons'
import { v4 as uuidv4 } from 'uuid'
import BookshelfModal from '../common/Modals/BookshelfModal/BookshelfModal'
import Button from '../common/Buttons/Button/Button'
import BookshelfPanel from '../common/BookshelfPanel/BookshelfPanel'
import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import TopFacade from './components/TopFacade/TopFacade'
import Tabs from './components/Tabs/Tabs'







const BookclubPage = () => {

    const { userBookclubs } = userData()
    const [bookclub, setBookclub] = useState<Bookclub | null>(null)
    const [activeBookshelf, setActiveBookshelf] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0)
    const [subNav, setSubNav] = useState(false)

    const tabContents = ['Bookshelves', 'Current Read']
    const bookshelfRef = useRef<HTMLDialogElement>(null)
   
    const [isMember, setIsMember] = useState(false)
    const parameters = useParams<{id: string}>()
    const openBookshelfModal = () => bookshelfRef.current?.showModal()
    const closeBookshelfModal = () => bookshelfRef.current?.close()

    

    useEffect(() => {
        setIsMember(() => {
            return  userBookclubs.map((userBookclub: Bookclub) => userBookclub.bookclub_id).some(userBookclubId => userBookclubId === parameters.id)
        })

        const lastVisited = new Date().toISOString()
        localStorage.setItem(`lastVisited/${parameters.id}`, lastVisited)

    }, [userBookclubs])
    
    

    useEffect(() => {

        try {
            const socket = new WebSocket(`ws://localhost:8000/ws/bookclub/addBookshelf/${parameters.id}`)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                console.log('web socket data:', data)

                if (data.type == 'get_bookclub_data') {
                    setBookclub(data.bookclub_data)
                }
            }

            socket.onerror = (error) => {
                console.error('Websocket bookclub data error', error)
            }

            socket.onopen = () => console.log('Book data websocket connected')
            socket.onclose = () => console.log('Book data websocket disconnected')

            return () => socket.close()

        } catch(err) {
            console.error('Bookclub data websocket failed to initialize:', err)
        }

    }, [])

    const panels = [
        <BookshelfPanel activeBookshelf={activeBookshelf} bookshelves={bookclub?.bookshelves} />,
        <CurrentReadPanel />
    ]
    const PanelComponent = () => panels[activeTab]
  

    const createBookshelf = async (formData: FormData): Promise<void> => {
        console.log('form data:', formData.get('bookshelfName'))

        const bookshelf = {
            bookshelf_id: uuidv4(),
            name: formData.get('bookshelfName'),
            bookclub_id: bookclub?.bookclub_id

        }

        try {
            const response = await fetch('http://localhost:8000/api/bookclub/addBookshelf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookshelf)
            })

            if (response.ok) {
                const data = response.json()
                console.log("create bookshelf data:", data)
            }


        } catch(err) {
            console.error('Error connecting to backend for bookshelf creation:', err)
        }
    }

    console.log('BOOKCLUB DATA:', bookclub)

    return(
            <div className='bookclub-container'>
                {isMember && (
                    <div className="bookclub-content-wrapper">
                        <TopFacade id={parameters.id} bookclub={bookclub}></TopFacade>
                        
                        
                        <div className="tabs-wrapper">
                            <hr />
                            
                            <div className="tabs-bar-wrapper">
                                <Tabs
                                    setSubNav={setSubNav} 
                                    contents={tabContents} 
                                    setActiveTab={setActiveTab} 
                                    activeTab={activeTab}
                                >

                                </Tabs>
                                <Button><SearchIcon></SearchIcon></Button>
                            </div>
                            <nav className={`bookshelves-subnav ${subNav ? 'active' : ''}`}>
                                    <Button onClick={openBookshelfModal}>Add Bookshelf</Button>
                                    <BookshelfModal 
                                        bookshelfRef={bookshelfRef}
                                        closeBookshelfModal={closeBookshelfModal}
                                        createBookshelf={createBookshelf}
                                    >
                                    </BookshelfModal>
                            </nav>
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


{/* <button onClick={getNonMembers}>Invite Users</button>
                        {showInvite ?
                            <form action={sendInvite as any} className="invite-form" method='post'>
                                <ul>{nonMembers}</ul>
                                <button type='submit'>Submit</button>
                    
                            </form>
                            : ''} */}



                            // const sendInvite = async (formData: FormData) => {
                            //     console.log('invite form data:', formData)
                            //     const id = formData.get('nonMemberRadio')
                            //     const inviteReq = {
                            //         invited_user_id: id,
                            //         bookclub_id: bookclub?.bookclub_id,
                            //     }
                        
                            //     const token = localStorage.getItem('authToken')
                            //     const parsedToken = token ? JSON.parse(token) : null
                        
                        
                            //     console.log(`Token ${parsedToken}`)
                            //     if (!parsedToken) {
                            //         console.error('No auth token found')
                            //         return
                            //     }
                        
                            //     try {
                            //         const response = await fetch('http://localhost:8000/api/sendInvite', {
                            //             method: 'POST',
                            //             headers: {
                            //                 'Content-Type': 'application/json',
                            //                 'Authorization': `Token ${parsedToken}`
                            //             },
                            //             body: JSON.stringify(inviteReq)
                            //         })
                        
                            //         const data = await response.json()
                            //         console.log('Response from server', data)
                        
                            //         if (!response.ok) {
                            //             throw new Error(data.error || 'Something went wrong')
                            //         }
                            //     } catch (error) {
                            //         console.error('Error sending invitation:', error)
                            //     }
                                
                            // }