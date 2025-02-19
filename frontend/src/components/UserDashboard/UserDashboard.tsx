import './UserDashboard.css';
import { FC, useState } from 'react';
import {  Bookclub, Invitation, UserData, Bookshelf } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import Bookspanel from './components/BooksPanel/BooksPanel'
import BookclubPanel from './components/BookclubPanel/BookclubPanel';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Tabs from './components/Tabs/Tabs'
import Sidebar from './components/Sidebar/Sidebar'


interface UserDashboardProps {
    userData: UserData
}



const UserDashboard: FC<UserDashboardProps> = ({userData}) => {

    
    const [activeTab, setActiveTab] = useState(0)
    const storedUser = localStorage.getItem('currentUser')
    const activeUser = storedUser ? JSON.parse(storedUser) : null;

    const [invites, setInvites] = useState<Invitation[]>(userData.user_invites)
    const [bookclubs, setBookclubs] = useState<Bookclub[]>(userData.user_bookclubs)



    





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
            .then(data => console.log('Bookshelf created successfully', data))
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
                setBookclubs((prev) => [...prev, data])
            }
                
                
               )
            .catch(err => console.error('Failed to create bookshelf', err))   
        }

        
        console.log('userdashboard invites:', invites)
        console.log('userdashboard bookclubs:', bookclubs)


    return(
        <div className='dashboard-container'>
            <main>

                <Tabs activeTab={activeTab} setActiveTab={setActiveTab}></Tabs>
  
                <div className="tab-panels-container container-flex">
                    {activeTab === 0 && (

                        <Bookspanel userBookshelves={userData.user_bookshelves}></Bookspanel>
                        
                    )}
                    {activeTab === 1 && (
                        <BookclubPanel user={activeUser} userInvites={invites}></BookclubPanel>
                    )}

                    {activeTab === 2 && (

                        <SettingsPanel user={activeUser}></SettingsPanel>  

                    )}
                </div>
                

            </main>
            <Sidebar createBookshelf={createBookshelf} createBookClub={createBookClub}></Sidebar>


            
        </div>
    )
}

export default UserDashboard

