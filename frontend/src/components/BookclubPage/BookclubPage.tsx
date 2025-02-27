import './BookclubPage.css'
import {useState, useEffect, useRef} from 'react'
import {useParams } from 'react-router-dom'
import { Bookclub } from '../../types'
import { userData } from '../../components/common/UserContext'
import { SearchIcon, ArrowLeftIcon } from '../common/Icons'
import { v4 as uuidv4 } from 'uuid'
import BookclubBackground from './assets/bookclub-background.jpg'
import Tabs from '../common/Tabs/Tabs'



const BookclubPage : React.FC = () => {

    const { userBookclubs } = userData()
    const [activeTab, setActiveTab] = useState(0)
    const [activePanel, setActivePanel] = useState(false)
    const [isRotated, setIsRotated] = useState(false)
    const tabContents = ['Discussion', 'Bookshelves', 'Current Read']

    const modalRef = useRef<HTMLDialogElement>(null)
    
    const [isMember, setIsMember] = useState(false)
    const parameters = useParams()

    useEffect(() => {
        setIsMember(isMember => {
            return isMember = userBookclubs.map((userBookclub: Bookclub) => userBookclub.bookclub_id).some(userBookclubId => userBookclubId === parameters.id)
        })
    }, [userBookclubs])
    const [bookclub, setBookclub] = useState<Bookclub | null>(null)
    

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
  

    const openModal = () => {

        modalRef.current?.showModal()
        
    }

    const closeModal = () => {
        modalRef.current?.close()
    }

    
    const UserProfileIcons = bookclub?.members.map((member, index) => {
        return (
            <li key={index} >
                <div 
                    className="circle" 
                    style={{ marginLeft: `${index - 15}px`,
                                zIndex: index + 1, 
                                position: 'relative', 
                                backgroundColor: '#FF8C00',
                                border: '2px solid white'
                            }}
                    >{member?.username?.charAt(0).toUpperCase()}</div>
            </li>
        )
    })

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

    const toggleAccordion = () => {
        setActivePanel(prev => !prev)
        setIsRotated(prev => !prev)

    }

    console.log('book clubs data:', bookclub)

    return(
            <div className='bookclub-container'>
                {isMember && (
                    <div className="bookclub-content-wrapper">
                        <div className='bookclub-top-facade'>
                            <div className="bookclub-background">
                                <img src={BookclubBackground} alt="" />
                            </div>
                            <div className="bookclub-top-bar">
                                <h2>{bookclub?.name}</h2>
                                <small>{bookclub?.members.length} Members</small>
                                <div className="header-members-wrapper">
                                    <ul className='user-profile-list' >
                                        {UserProfileIcons}
                                    </ul>
                                    <div className="member-buttons">
                                        <button>+ Invite</button>
                                        <button>Joined</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="tabs-wrapper">
                            <hr />
                            
                            <div className="tabs-bar-wrapper">
                                <Tabs contents={tabContents} setActiveTab={setActiveTab} activeTab={activeTab}></Tabs>
                                <button className="bookclub-searchBtn">
                                    <SearchIcon></SearchIcon>
                                </button>
                            </div>
                        </div>
                        <div className="bookclub-panels-container">
                            {activeTab === 0 && (
                                <div className="discussion-panel">
                                    <h2>Discussions</h2>

                                </div>
                            )}

                            {activeTab === 1 && (
                                <div className="bookshelves-panel">
                                    <div className="bookshelves-bar">
                                        <h2>Bookshelves</h2>
                                        <button onClick={openModal}>Add Bookshelf</button>
                                    </div>
                                    <dialog className="bookshelf-modal" ref={ modalRef } >
                                        <form action={createBookshelf as unknown as string} method='post'>
                                            <input type="text" name='bookshelfName' placeholder='Bookshelf Name' required/>
                                            <div className="button-wrapper">
                                                <button onClick={closeModal}>Cancel</button>
                                                <button type='submit'>Create</button>
                                            </div>

                                        </form>
                                        
                                    </dialog>
                                    <div className="bookshelf-list"> 
                                        <div className="accordion" >
                                            <div className="accordion-panel" >
                                                <h2 id='panel1-heading'>
                                                    <button
                                                        className='accordion-trigger'
                                                        aria-controls='panel1-content'
                                                        aria-expanded={activePanel}
                                                         
                                                    >
                                                        <span id='panel1-title'>{bookclub?.bookshelves[0].name}</span>
                                                        <div className="accordion-icon" onClick={toggleAccordion}>
                                                            <ArrowLeftIcon isRotated={isRotated}></ArrowLeftIcon>
                                                        </div>
                                                    </button>
                                                </h2>
                                                <div 
                                                    className='accordion-content' 
                                                    id='panel1-content'
                                                    aria-labelledby='panel1-heading'
                                                    aria-hidden='true'
                                                    role='region'>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut soluta asperiores impedit et molestias voluptates culpa maxime nulla officia expedita numquam, reiciendis quae minima quaerat debitis quia cupiditate eveniet nesciunt.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                            {activeTab === 2 && (
                                <div className="currentRead-panel">
                                    <h2>Current Read</h2>
                                    
                                </div>
                            )}
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