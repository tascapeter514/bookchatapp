import './Sidebar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bookclub } from '../../../../types'



interface SidebarProps {
    bookclubs: Bookclub[],
    createBookshelf: (formData: FormData) => void,
    createBookClub: (formData: FormData) => void,
}


const Sidebar: React.FC<SidebarProps> = ({bookclubs, createBookshelf, createBookClub}) => {

    const [showBookshelf, setShowBookshelf] = useState(false)
    const [showBookclub, setShowBookClub] = useState(false)

    const bookclubElements = bookclubs?.map((bookclub: Bookclub) => {
        return(
            <Link to={`/bookclub/${bookclub.bookclub_id}`}>
                <li key={bookclub.bookclub_id}><p>{bookclub.name}</p></li>
            </Link>
        ) 
    })
    
    
    
    
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
            
    </aside>


    )
}

export default Sidebar