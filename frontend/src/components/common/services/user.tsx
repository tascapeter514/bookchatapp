import axios from 'axios'
import { ActiveUser } from '../../../types'

const baseUrl = 'http://localhost:8000/api/user/updateAccount'


export const updateContact = async (formData: FormData, setActiveUser: (user: ActiveUser) => void) => {

        const id = Number(formData.get('userId'))

        const newContact = {
            firstName: String(formData.get('firstName')),
            lastName: String(formData.get('lastName')),
            emailAddress: String(formData.get('emailAddress'))
    
        }
    
    
        try {
    
            const response = await axios.put(`${baseUrl}/${id}`, newContact)
    
            if (response.status == 200) {
                console.log('user account response:', response.data)
                setActiveUser(response.data)
            } else {
                console.log("There was an error updating your contact info:", response.statusText)
                
            }
    
        } catch(err) {
            console.error("We're sorry. Your request to change your contact info failed to go through")
            
        }
        
    
    }


export default {
    updateContact: updateContact
}