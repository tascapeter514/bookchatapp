import './BookclubsPanel.css'
import { userData } from '../../../common/UserContext.tsx'




const BookclubsPanel = () => {

    const { activeUser, userBookclubs } = userData()

    console.log('bookclubs panel bookclubs:', userBookclubs)

    






    const bookclubElements = userBookclubs.map((userBookclub) => {

        const lastVisited = localStorage.getItem(`lastVisited/${userBookclub.bookclub_id}`)

        function weeksAgo(date: string) {
            if (lastVisited) {

                const now = new Date()
                const lastVisit = new Date(date)



                const timeDiff = now.getTime() - lastVisit.getTime()
                const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7))
                return weeksDiff

            }
        }

        const weeksSinceVisited = lastVisited ? weeksAgo(lastVisited) : undefined
        console.log('weeks since visited:', weeksSinceVisited)



        const BookclubMemberIcons = userBookclub.members.map((member, index) => {
            return (
                <li className='bookclub-member-icon' key={index} >
                    <div 
                        className="bookclub-circle" 
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

        return(
            <li className='bookclub-element' key={userBookclub.bookclub_id}>
                <div className="bookclub-header">
                    <img className='bookclub-icon' src={`http://localhost:8000${userBookclub.cover_image}`} alt="cover" />
                    <span>{userBookclub.name}</span>
                </div>
                <span>{userBookclub.members.length} members</span>
                <ul className='bookclub-icons-list'>{BookclubMemberIcons}</ul>
                {weeksSinceVisited === 0 && (
                    <p>You just visited this week!</p>
                )}
                {weeksSinceVisited === undefined && (<p>You have yet to visit</p>)}
                {weeksSinceVisited !== undefined && weeksSinceVisited > 0 && (<p>You visited {weeksSinceVisited} weeks ago</p>)}
                
                


            </li>
        )
    })


    return(
        <div className="bookclubs-container">
            <h1>Bookclubs</h1>
            <hr className='underline' />
            <ul className='bookclub-list'>{bookclubElements}</ul>
            
        </div>
    )

}

export default BookclubsPanel