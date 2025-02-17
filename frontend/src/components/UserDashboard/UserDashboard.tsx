import './UserDashboard.css';
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  Book, Bookshelf, Bookclub, Invitation } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import Bookspanel from './components/BooksPanel/BooksPanel'




const UserDashboard: FC = () => {

    
    const [activeTab, setActiveTab] = useState(0)
    const storedUser = localStorage.getItem('currentUser')
    const activeUser = storedUser ? JSON.parse(storedUser) : null;
    const switchTab = (index: number) => {
        setActiveTab(index)
    }
  
    const [showBookshelf, setShowBookshelf] = useState(false)
    const [showBookclub, setShowBookClub] = useState(false)
    const [bookclubs, setBookClubs] = useState<Bookclub[]>([])
    const [invitations, setInvitations] = useState<Invitation[]>([])


    useEffect(() => {
        if (!activeUser?.id) return
        try {
            const socket = new WebSocket(`ws://localhost:8000/ws/bookchat/getBookclubs/${activeUser.id}`)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === 'get_bookclubs') {
                    setBookClubs(data.bookclubs)
                }
                
            }

            socket.onerror = (error) => {
                console.error('Websocket error:', error)
            }

            socket.onopen = () => console.log('Bookclub websocket connected')
            socket.onclose = () => console.log('Bookclub websocket disconnected')

            return () => socket.close()


        } catch (err) {
            console.error('Failed to initialize Websocket:', err)
        }
    }, [])

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/bookchat/joinBookclub');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.type === 'join_bookclub') {

                setInvitations(prevInvitations => {
                    const updated = prevInvitations.map(invitation => {
                        if(invitation.bookclub_to_join.bookclub_id === data.bookclub_id) {
                            return {
                                ...invitation,
                                bookclub_to_join: {
                                    ...invitation.bookclub_to_join,
                                    members: data.updated_members
                                },
                            };
                        }
                        return invitation;
                    })


                        return [...updated]

                })
                

            }
        }
        socket.onopen = () => console.log('Web socket connected')
        socket.onclose = () => console.log('Web socket disconnected')

        return () => socket.close();                       {/* {isMember ? "" : <button onClick={() => joinBookclub(bookclub)}>Join</button>} */}
    }, [])

  

    const bookclubElements = bookclubs?.map((bookclub: Bookclub) => {
        return(
            <Link to={`/bookclub/${bookclub.bookclub_id}`}>
                <li key={bookclub.bookclub_id}><p>{bookclub.name}</p></li>
            </Link>
        ) 
    })

    function joinBookclub(bookclub: Bookclub) {

        const token = localStorage.getItem('authToken')
        const parsedToken = token ? JSON.parse(token) : null

        const joinReq = {
            user_id: activeUser.id,
            bookclub_id: bookclub.bookclub_id
        }

        fetch(`http://localhost:8000/api/acceptInvite`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${parsedToken}`
            },
            body: JSON.stringify(joinReq)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log('There was an error in joining your bookclub:', err))
    }

  



    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const parsedToken = token ? JSON.parse(token) : null
   
        fetch(`http://localhost:8000/api/getInvites/${activeUser.id}`, {
            headers: {
                'Authorization': `Token ${parsedToken}`
            }
            
        })
        .then(res => res.json())
        .then(data => setInvitations(data))
        .catch(err => console.log('there was an error retrieving the invites:', err))
    }, [])


 


    function createBookshelf(formData: FormData) {
        const bookshelf = {
            bookshelf_id: uuidv4(),
            name: formData.get('bookshelfName'),
            user: activeUser.id
        }
            fetch('http://localhost:8000/api/bookshelf/', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookshelf)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => Promise.reject(err))
                }
                return response.json()
            })
            .then(data => console.log('Bookshelf created successfully', data))
            .catch(err => console.error('Failed to create bookshelf', err))
        }


        const createBookClub = (formData: FormData) => {
            const bookclub = {
                bookclub_id : uuidv4(),
                name: formData.get('bookClubName'),
                administrator: activeUser.id,
                bookshelves: [],
                currentRead: [],
            }


            fetch('http://localhost:8000/api/bookclub/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookclub)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => Promise.reject(err));
                }
                return response.json()
            })
            .then(data => {
                console.log('Bookclub created successfully', data)
                setBookClubs((prev) => [...prev, data])

            }
                
                
               )
            .catch(err => console.error('Failed to create bookshelf', err))   
        }

        const invitationElements = invitations?.map((invitation: Invitation & {isMember?: boolean}) => {
            const bookclub = invitation['bookclub_to_join']
            const memberIds = bookclub['members'].map((member) => member['id'])
            const invited_by_user = invitation['invited_by_user']
            const isMember = invitation.isMember ?? memberIds.includes(activeUser.id)
            return(
                    <li key={invitation.invitation_id}>
                        {isMember ? 
                            <Link to={`/bookclub/${bookclub.bookclub_id}`}><h3>{bookclub.name}</h3></Link>
                            : <h3>{bookclub.name}</h3> }
                        <p>{invited_by_user.username}</p>

    
                        {!isMember && (
                            <button onClick={() => joinBookclub(bookclub)}>Join</button>
    
                        )}
                    </li>
                
            )
        })

        console.log('book clubs:', bookclubs)
        console.log('invites:', invitations)

    return(
        <div className='dashboard-container'>
            <main>
                <div className="tabs-container">
                    <ul arial-labelledby='tabs-title'>
                        <li 
                            onClick={() => switchTab(0)}
                            className={activeTab === 0 ? 'active' : ""}><a id='tab-1' href="#books">Books</a></li>
                        <li onClick={() => switchTab(1)}
                            className={activeTab === 1 ? 'active' : ""}><a id='tab-2' href="#bookclubs">BookClubs</a></li>
                        <li onClick={() => switchTab(2)}
                            className={activeTab === 2 ? 'active' : ""}><a id='tab-3' href="#settings">Settings</a></li>
                    </ul>
                </div>
                <div className="tab-panels-container container-flex">
                    {activeTab === 0 && (

                        <Bookspanel user={activeUser}></Bookspanel>
                        
                    )}
                    {activeTab === 1 && (

                        <div id='bookclubs' aria-labelledby='tab-2'>
                            <h2>Bookclubs</h2>
                            <ul>{invitationElements}</ul>
                        </div>
                        
                    )}

                    {activeTab === 2 && (
                        <div id='settings' aria-labelledby='tab-3'>
                            <p>{storedUser ? JSON.parse(storedUser).username : ''}</p>
                        </div>
                    )}
                </div>
                

            </main>

            <aside className="sidebar">
                <div className="sidebar-widget">
                    <h2 className='widget-title'></h2>
                    <p className="widget-body"></p>
                    <button onClick={() => setShowBookshelf(prev => !prev)}>Add a Bookshelf</button>
                    {showBookshelf ? 
                    
                    <form action={createBookshelf as any} method='patch'>
                        <label>Name: <input name='bookshelfName' id='bookshelfInput' required></input></label>
                        <button type='submit'>Create</button>
                    </form>
                    : ''}
                </div>
                <div className="bookclub-submission-container">
                    <button onClick={() => setShowBookClub(prev => !prev)}>Add a Bookclub</button>
                    {showBookclub ?
                        <form action={createBookClub as any} method='post'>
                            <label><input name='bookClubName' id='bookcClubInput' /></label>
                            <button type='submit'>Create Book Club</button>
                        </form> 
                    
                
                            : ''}
                </div>
                <br />
                <hr />

                <h3>Book Clubs</h3>
                <ul>{ bookclubElements }</ul>
                    
            </aside>
            
        </div>
    )
}

export default UserDashboard

