import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/user/updateAccount'

const update = (id: number, newContact:{
    firstName: string, lastName: string, emailAddress: string}) => axios.put(`${baseUrl}/${id}`, newContact)


export default {
    update: update
}