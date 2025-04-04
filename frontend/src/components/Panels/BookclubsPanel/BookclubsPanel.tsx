import './BookclubsPanel.css'
import { userContext } from '../../../context/UserContext/UserContext.tsx'

import { weeksAgo } from '../../functions.tsx'
import Button from '../../Buttons/Button/Button.tsx'
import ProfileIcons from '../../ProfileIcons/ProfileIcons.tsx'
import Header from '../../Header/Header.tsx'




const BookclubsPanel = () => {

    const { bookclubs } = userContext()

  

    const bookclubElements = bookclubs.data.map((bookclub) => {

        const lastVisited = localStorage.getItem(`lastVisited/${bookclub.id}`)
        const weeksSinceVisited = lastVisited ? weeksAgo(lastVisited) : undefined

        return(
            <li className='bookclub-element' key={bookclub.id}>
                <article className="bookclub-header">
                    <img className='bookclub-cover' src={`http://localhost:8000${bookclub.cover_image}`} alt="cover" />
                    <div className="bookclub-header-text">
                        <span className='bookclub-title'>{bookclub.name}</span>
                        {weeksSinceVisited === 0 && (<span className='visited-span'>You just visited this week!</span>)}
                        {weeksSinceVisited === undefined && (<span className='visited-span'>You have yet to visit</span>)}
                        {weeksSinceVisited !== undefined && weeksSinceVisited > 0 && (<span className='visited-span'>You visited {weeksSinceVisited} weeks ago</span>)}
                        <ul className='bookclub-icons-list'><ProfileIcons users={bookclub.members}></ProfileIcons></ul>
                    </div>
                </article>
                <Button>View Bookclub</Button>
            </li>
        )
    })


    return(
        <section className="bookclubs-container">
            <Header>Bookclubs</Header>
            <ul className='bookclub-list'>{bookclubElements}</ul>
        </section>
    )

}

export default BookclubsPanel