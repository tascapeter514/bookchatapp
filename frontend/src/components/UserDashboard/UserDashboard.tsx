import './UserDashboard.css';
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUser, Book, ActiveUser, Bookshelf, Bookclub } from '../../types';
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
    const [bookShelves, setBookShelves] = useState<Bookshelf[]>([])
    const [userBooks, setUserBooks] = useState<Book[]>([])
    const [showBookshelf, setShowBookshelf] = useState(false)
    const [showBookclub, setShowBookClub] = useState(false)
    const [bookclubs, setBookClubs] = useState<Bookclub[]>([])

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

    const bookclubElements = bookclubs?.map((bookclub: Bookclub) => {
        console.log('bookclub id:', bookclub.bookclub_id)
        return(
            <Link to={`/bookclub/${bookclub.bookclub_id}`}>
                <li key={bookclub.bookclub_id}><p>{bookclub.name}</p></li>
            </Link>
        ) 
    })

    // to={`/book/${bestseller.title_id}`}

    // console.log('user books elements:', userBooksElements )
 
   console.log('bookshelves', bookShelves)
   useEffect(() => {
    fetch('http://localhost:8000/api/bookshelf/')
    .then(res => res.json())
    .then(data => {
        setBookShelves(data)
        console.log(data[0]['titles'])
        setUserBooks(data[0]['titles'])

    } )
    .catch(err => console.log('There was an error:', err))
    }, [])
// ${activeUser.id}/
    useEffect(() => {
        fetch(`http://localhost:8000/api/bookclub/?user=${activeUser.id}`)
        .then(res => res.json())
        .then(data => {
            // console.log('book club data:', data)
            setBookClubs(data)
        })
        .catch(err => console.log('There was an error:', err))
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
//   console.log('user books:', userBooks)
        console.log('bookclubs:', bookclubs)

        const createBookClub = (formData: FormData) => {
            // console.log('form data:', formData);
            const bookclub = {
                bookclub_id : uuidv4(),
                name: formData.get('bookClubName'),
                administrator: activeUser.id,
                members: [],
                bookshelves: [],
                currentRead: []
            }
            // console.log('bookclub', bookclub)

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
            .then(data => console.log('Bookclub created successfully', data))
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

