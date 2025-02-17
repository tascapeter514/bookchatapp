import './UserDashboard.css';
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  Bookclub } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import Bookspanel from './components/BooksPanel/BooksPanel'
import BookclubPanel from './components/BookclubPanel/BookclubPanel';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Tabs from './components/Tabs/Tabs'




const UserDashboard: FC = () => {

    
    const [activeTab, setActiveTab] = useState(0)
    const storedUser = localStorage.getItem('currentUser')
    const activeUser = storedUser ? JSON.parse(storedUser) : null;
    const [bookclubs, setBookClubs] = useState<Bookclub[]>([])
    const [showBookshelf, setShowBookshelf] = useState(false)
    const [showBookclub, setShowBookClub] = useState(false)
    


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

    
  

    const bookclubElements = bookclubs?.map((bookclub: Bookclub) => {
        return(
            <Link to={`/bookclub/${bookclub.bookclub_id}`}>
                <li key={bookclub.bookclub_id}><p>{bookclub.name}</p></li>
            </Link>
        ) 
    })

  
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

        

        console.log('book clubs:', bookclubs)


    return(
        <div className='dashboard-container'>
            <main>

                <Tabs activeTab={activeTab} setActiveTab={setActiveTab}></Tabs>
  
                <div className="tab-panels-container container-flex">
                    {activeTab === 0 && (

                        <Bookspanel user={activeUser}></Bookspanel>
                        
                    )}
                    {activeTab === 1 && (
                        <BookclubPanel user={activeUser}></BookclubPanel>
                    )}

                    {activeTab === 2 && (

                        <SettingsPanel user={activeUser}></SettingsPanel>  

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

