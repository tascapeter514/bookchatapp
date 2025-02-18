import './UserDashboard.css';
import { FC, useState, Dispatch, SetStateAction } from 'react';
import {  Bookclub, Invitation } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import Bookspanel from './components/BooksPanel/BooksPanel'
import BookclubPanel from './components/BookclubPanel/BookclubPanel';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Tabs from './components/Tabs/Tabs'
import Sidebar from './components/Sidebar/Sidebar'


interface UserDashboardProps {
    userInvites: Invitation[],
    userBookclubs: Bookclub[],
    setUserBookclubs: Dispatch<SetStateAction<Bookclub[]>>
}



const UserDashboard: FC<UserDashboardProps> = ({userInvites, userBookclubs, setUserBookclubs}) => {

    
    const [activeTab, setActiveTab] = useState(0)
    const storedUser = localStorage.getItem('currentUser')
    const activeUser = storedUser ? JSON.parse(storedUser) : null;

    




    

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
                setUserBookclubs((prev) => [...prev, data])
            }
                
                
               )
            .catch(err => console.error('Failed to create bookshelf', err))   
        }

        


    return(
        <div className='dashboard-container'>
            <main>

                <Tabs activeTab={activeTab} setActiveTab={setActiveTab}></Tabs>
  
                <div className="tab-panels-container container-flex">
                    {activeTab === 0 && (

                        <Bookspanel user={activeUser}></Bookspanel>
                        
                    )}
                    {activeTab === 1 && (
                        <BookclubPanel user={activeUser} userInvites={userInvites}></BookclubPanel>
                    )}

                    {activeTab === 2 && (

                        <SettingsPanel user={activeUser}></SettingsPanel>  

                    )}
                </div>
                

            </main>
            <Sidebar userBookclubs={userBookclubs} createBookshelf={createBookshelf} createBookClub={createBookClub}></Sidebar>


            
        </div>
    )
}

export default UserDashboard

