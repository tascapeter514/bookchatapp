import './BookclubsPanel.css'
import { userData } from '../../../common/Context/UserContext/UserContext'
import { weeksAgo } from '../../../common/functions.tsx'
import Button from '../../../common/Buttons/Button/Button.tsx'
import ProfileIcons from '../../../common/ProfileIcons/ProfileIcons.tsx'
import Header from '../../../common/Header/Header.tsx'




const BookclubsPanel = () => {

    const { userBookclubs } = userData()

    const bookclubElements = userBookclubs.map((userBookclub) => {

        const lastVisited = localStorage.getItem(`lastVisited/${userBookclub.id}`)
        const weeksSinceVisited = lastVisited ? weeksAgo(lastVisited) : undefined

        return(
            <li className='bookclub-element' key={userBookclub.id}>
                <article className="bookclub-header">
                    <img className='bookclub-cover' src={`http://localhost:8000${userBookclub.cover_image}`} alt="cover" />
                    <div className="bookclub-header-text">
                        <span className='bookclub-title'>{userBookclub.name}</span>
                        {weeksSinceVisited === 0 && (<span className='visited-span'>You just visited this week!</span>)}
                        {weeksSinceVisited === undefined && (<span className='visited-span'>You have yet to visit</span>)}
                        {weeksSinceVisited !== undefined && weeksSinceVisited > 0 && (<span className='visited-span'>You visited {weeksSinceVisited} weeks ago</span>)}
                        <ul className='bookclub-icons-list'><ProfileIcons users={userBookclub.members}></ProfileIcons></ul>
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