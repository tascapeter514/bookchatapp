import './Sidebar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Bookclub, Bookshelf } from '../../../../types'
import { userData } from '../../../../components/common/UserContext'





const Sidebar: React.FC = () => {

    const {userBookclubs, userBookshelves, activeUser, setUserBookclubs, setUserBookshelves } = userData()





    const [showBookshelf, setShowBookshelf] = useState(false)
    const [showBookclub, setShowBookClub] = useState(false)


    function createBookshelf(formData: FormData): void {
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
            .then(data => {
                console.log('Bookshelf created successfully', data)
                setUserBookshelves((prev) => [...prev, data])
            })
            .catch(err => console.error('Failed to create bookshelf', err))
        }


        const createBookClub = (formData: FormData): void => {
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
                setUserBookclubs((prev) => [...prev, data])
            }
                
                
               )
            .catch(err => console.error('Failed to create bookshelf', err))   
        }








    const bookclubElements = userBookclubs?.map((bookclub: Bookclub) => {
        return(
            <Link to={`/bookclub/${bookclub.bookclub_id}`}>
                <li key={bookclub.bookclub_id}><p>{bookclub.name}</p></li>
            </Link>
        ) 
    })

    const bookshelfElements = userBookshelves.map((userBookshelf: Bookshelf) => {
        return(
            <li key={userBookshelf.bookshelf_id}>
                <p>{userBookshelf.name}</p>

            </li>
        )
    })

    console.log('sidebar bookclubs:', userBookclubs)

    
    
    
    
    
    return(

        <aside className="sidebar">
        <div className="sidebar-widget">
            <h2 className='widget-title'></h2>
            <p className="widget-body"></p>
            <button onClick={() => setShowBookshelf(prev => !prev)}>Add a Bookshelf</button>

                    {/* CHECK THE TYPE DECLARATION */}
            {showBookshelf ? 
            <form action={createBookshelf as unknown as string} method='patch'>
                <label>Name: <input name='bookshelfName' id='bookshelfInput' required></input></label>
                <button type='submit'>Create</button>
            </form>
            : ''}
        </div>
        <div className="bookclub-submission-container">
            <button onClick={() => setShowBookClub(prev => !prev)}>Add a Bookclub</button>

            {/* CHECK THE TYPE DECLARATION */}
            {showBookclub ?
                <form action={createBookClub as unknown as string} method='post'>
                    <label><input name='bookClubName' id='bookcClubInput' /></label>
                    <button type='submit'>Create Book Club</button>
                </form> 
            
        
                    : ''}
        </div>
        <br />
        <hr />

        <h3>Book Clubs</h3>
        <ul>{ bookclubElements }</ul>

        <br />
        <hr />
        <h3>Bookshelves</h3>
        <ul>{ bookshelfElements }</ul>
            
    </aside>


    )
}

export default Sidebar