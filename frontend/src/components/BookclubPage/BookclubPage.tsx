import './BookclubPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {useParams } from 'react-router-dom'
import { Bookclub, Bookshelf } from '../../types'
import { userData } from '../../components/common/UserContext'
import { SearchIcon } from '../common/Icons'
import Button from '../common/Buttons/Button/Button'
import BookshelfPanel from '../common/BookshelfPanel/BookshelfPanel'
import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import SubNavbar from './components/SubNavbar/SubNavbar'
import TopFacade from './components/TopFacade/TopFacade'
import Tabs from './components/Tabs/Tabs'







const BookclubPage = () => {

    const { userBookclubs } = userData()
    const [bookclub, setBookclub] = useState<Bookclub | null>(null)
    const [bookshelves, setBookshelves] = useState<Bookshelf[] | []>([])
    const [activeBookshelf, setActiveBookshelf] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0)
    const [subNav, setSubNav] = useState(false)
    const [newBookshelf, setNewBookshelf] = useState<string>('')

    const tabContents = ['Bookshelves', 'Current Read']
    
   
    const [isMember, setIsMember] = useState(false)
    const parameters = useParams<{id: string}>()


    useEffect(() => {

        try {
            const socket = new WebSocket(`ws://localhost:8000/ws/bookclub/${parameters.id}`)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                console.log('web socket data:', data)

                if (data.type == 'get_bookclub_data') {

                    const  bookshelvesData  = data.bookshelves_data
                    const bookclubData = data.bookclub_data
                    setBookclub(bookclubData)
                    setBookshelves(bookshelvesData)
                    
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
        <BookshelfPanel activeBookshelf={activeBookshelf} bookshelves={bookshelves} />,
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

        // console.log('bookshelf object:', bookshelfObject)
        // setBookshelves(prev => [...(prev || []), bookshelfObject])
        // setNewBookshelf('')


        // const bookshelf = {
        //     name: formData.get('bookshelfName'),
        //     bookclub_id: bookclub?.bookclub_id
        // }

        // try {
        //     const response = await fetch('http://localhost:8000/api/bookclub/addBookshelf', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(bookshelf)
        //     })

        //     if (response.ok) {
        //         const data = response.json()
        //         // ADD BOOKSHELF TO BOOKCLUB BOOKSHELVES
        //         console.log("create bookshelf data:", data)
        //     }


        // } catch(err) {
        //     console.error('Error connecting to backend for bookshelf creation:', err)
        // }
    }
    
   

    

    console.log('BOOKCLUB DATA:', bookclub)
    console.log('BOOKSHELVES DATA:', bookshelves)

    return(
            <div className='bookclub-container'>
                {isMember && (
                    <div className="bookclub-content-wrapper">
                        <TopFacade id={parameters.id} bookclub={bookclub}></TopFacade>
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
                                <Button><SearchIcon></SearchIcon></Button>
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