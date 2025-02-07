import './UserDashboard.css'
import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUser, Book } from '../../types'

interface dashProps {
    user: CurrentUser | null
}

const UserDashboard: FC<dashProps> = ({user}) => {
    // console.log('user:', user)
    
    const [activeTab, setActiveTab] = useState(0)
    const activeUser = localStorage.getItem('currentUser')
    const switchTab = (index: number) => {
        setActiveTab(index)
    }
    const [userBooks, setUserBooks] = useState<Book[]>([])

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


   console.log('user books:', userBooks)
   useEffect(() => {
    fetch('http://localhost:8000/api/userbookshelf/')
    .then(res => res.json())
    .then(data => setUserBooks(data))
    }, [])

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
                            <p>{activeUser ? JSON.parse(activeUser).username : ''}</p>
                        </div>
                    )}
                </div>
                

            </main>

            <aside className="sidebar">
                <div className="sidebar-widget">
                    <h2 className='widget-title'></h2>
                    <p className="widget-body"></p>
                </div>
            </aside>
            
        </div>
    )
}

export default UserDashboard

{/* <article className='article-featured'>
<h2 article-title></h2>
<p className="article-info"></p>
<p className="article-body"></p>
<a href="" className="article-read-more"></a>
</article>
<article className="article-recent">
<div className="article-recent-main"></div>
<div className="article-recent-secondary"></div>
<h2 className='article-title'></h2>
</article> */}