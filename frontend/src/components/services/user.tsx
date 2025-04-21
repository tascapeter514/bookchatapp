import axios from 'axios'
import {  Dispatch, SetStateAction } from 'react'
import { ActiveUser, Bookshelf } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const contactUrl = 'http://localhost:8000/api/user/updateAccount'
const passwordUrl = 'http://localhost:8000/api/user/updatePassword'
const bookshelfUrl = 'http://localhost:8000/api/user/addBookshelf'


export const changeContact = async (formData: FormData, setActiveUser: (user: ActiveUser) => void) => {

        const id = Number(formData.get('userId'))

        const newContact = {
            firstName: String(formData.get('firstName')),
            lastName: String(formData.get('lastName')),
            emailAddress: String(formData.get('emailAddress'))
    
        }
    
    
        try {
    
            const response = await axios.put(`${contactUrl}/${id}`, newContact)
    
            if (response.status == 200) {
                console.log('user account response:', response.data)
                setActiveUser(response.data)
            } else {
                console.log("There was an error updating your contact info:", response.statusText)
                
            }
    
        } catch(err) {
            console.error("We're sorry. Your request to change your contact info failed to go through:", err)
            
        }
    }

export const changePassword = async (formData: FormData, setActiveUser: (user: ActiveUser) => void) => {

    
    const id = Number(formData.get('userId'))

    const newPasswordInfo = {
        userId: id,
        currentPassword: String(formData.get('currentPassword')),
        newPassword: String(formData.get('newPassword'))
    }

    try {
        const response = await axios.put(`${passwordUrl}/${id}`, newPasswordInfo)

        if (response.status == 200) {
            console.log(response.data)
            setActiveUser(response.data)
        } else {
            console.log("There was an error updating your password:", response.statusText)
        }
    } catch(err) {
        console.log("We're sorry. Your request to change your password failed to go through:", err)
        
    }
}

export const addUserBookshelf = async (formData: FormData, setUserBookshelves: Dispatch<SetStateAction<Bookshelf[]>> ) => {

    console.log('add user bookshelf called')

    const id = Number(formData.get('userId'))
    const newBookshelf = {
        bookshelfId: uuidv4(),
        bookshelfName: String(formData.get('bookshelfName')),
        userId: Number(formData.get('userId')),
        titles: []
    }


    axios.post(`${bookshelfUrl}/${id}`, newBookshelf)
    .then((response) => {
        if (response.status >= 400) {
            throw new Error('server error')
        }
        console.log('user bookshelf data:', response.data)
        setUserBookshelves(prev => [...prev, response.data] )

        
    })
    .catch((error) => console.error('there was an error with adding your bookshelf:', error))
    



}


export default {
    changeContact: changeContact,
    changePassword: changePassword,
    addBookshelf: addUserBookshelf
    
}