import './BookclubPage.css'
import {useState, useEffect, useRef} from 'react'
import {useParams } from 'react-router-dom'
import { Bookclub, ActiveUser} from '../../types'
import { userData } from '../../components/common/UserContext'
import { SearchIcon } from '../common/Icons'
import BookclubBackground from './assets/bookclub-background.jpg'
import Tabs from '../common/Tabs/Tabs'



const BookclubPage : React.FC = () => {

    const { userBookclubs } = userData()
    const [activeTab, setActiveTab] = useState(0)
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
        fetch(`http://localhost:8000/api/bookclub/${parameters.id}`)
        .then(res => res.json())
        .then(data => setBookclub(data))
        .catch(err => console.log('There was an error fetching the following bookclub page', err))
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

    const createBookshelf = () => {

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
                                        <form action="">
                                            <input type="text" placeholder='Bookshelf Name' />

                                        </form>
                                        <div className="button-wrapper">
                                            <button onClick={closeModal}>Cancel</button>
                                            <button onClick={createBookshelf}>Create</button>
                                        </div>
                                    </dialog>
                                    <div className="bookshelf-list"> 
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