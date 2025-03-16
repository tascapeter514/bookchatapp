import axios from 'axios'
import { ActiveUser } from '../../../types'

const contactUrl = 'http://localhost:8000/api/user/updateAccount'
const passwordUrl = 'http://localhost:8000/api/user/updatePassword'


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

    console.log('change password data:', formData);
    
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
        console.error("We're sorry. Your request to change your password failed to go through:", err)
        
    }
}


export default {
    changeContact: changeContact,
    changePassword: changePassword
    
}