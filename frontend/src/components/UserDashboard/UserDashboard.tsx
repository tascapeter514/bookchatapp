import './UserDashboard.css';
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUser, Book, ActiveUser } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface dashProps {
    user: CurrentUser | null
}

const UserDashboard: FC<dashProps> = ({user}) => {
    // console.log('user:', user)
    
    const [activeTab, setActiveTab] = useState(0)
    const storedUser = localStorage.getItem('currentUser')
    const activeUser: ActiveUser = storedUser ? JSON.parse(storedUser) : null;
    const switchTab = (index: number) => {
        setActiveTab(index)
    }
    const [userBooks, setUserBooks] = useState<Book[]>([])
    const [showInput, setShowInput] = useState(false)

    const userBooksElements = userBooks.map((userBookElement: Book) => {

        return(<li key={userBookElement.title_id} className='userBook-element'>
                <Link to={`/book/${userBookElement.title_id}`}><img src={userBookElement.imageLinks['smallThumbnail']} alt="book-cover" /></Link>
                <h3>{userBookElement.title}</h3>
                <ul>{userBookElement.authors.map((author) => {
                    return(<li className='bookElements-authors' key={author.author_id}>{author.name}</li>)
                })}</ul>
                <p>{userBookElement.averageRating}</p>
            
        </li>)
    })

    // console.log('user books elements:', userBooksElements )
//    console.log('user books:', userBooks)
   useEffect(() => {
    fetch('http://localhost:8000/api/userbookshelf/')
    .then(res => res.json())
    .then(data => setUserBooks(data))
    }, [])

    function createBookshelf(formData: FormData) {
        console.log('form data:', formData)
        const bookshelf = {
            bookshelf_id: uuidv4(),
            name: formData.get('bookshelfName'),
            user: activeUser.id
        }
        console.log('bookshelf:', bookshelf)
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
                        <div id='books' aria-labelledby='tab-1'>
                            <h2>Books</h2>
                            <ul>{userBooksElements}</ul>
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div id='bookclubs' aria-labelledby='tab-2'>BookClubs</div>
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
                    <button onClick={() => setShowInput(prev => !prev)}>Add a Bookshelf</button>
                    {showInput ? 
                    
                    <form action={createBookshelf as any} method='post'>
                        <label>Name: <input name='bookshelfName' id='bookshelfInput' onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                
                            }
                        
                        }} required></input></label>
                        <button type='submit'>Create</button>
                    </form>

                    
                    
                    : ''}
                </div>
            </aside>
            
        </div>
    )
}

export default UserDashboard

