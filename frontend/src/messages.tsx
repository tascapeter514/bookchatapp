import { GET_ERRORS } from './types';
import { AxiosError } from 'axios';



// RETURN ERRORS

export const returnErrors = (msg: string, status: string | number) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status}

    }
}




export const axiosErrorHandler = (error: AxiosError): string => {

    console.log('error:', error)
    
    if (!error.response) {
        console.error('No response from server:', error.message)
        return 'Network error or server is down'
    }

    const { data } = error.response;

    if (typeof data === 'string') {
        console.error('Error:', data)
        return data
    }

    if (data && typeof data === 'object' ) {
        if ('username' in data) {
            console.error('Invalid username error:', data.username)
            return String(data.username)
        } else if ('password' in data) {
            console.error('Invalid password error:', data.password)
            return String(data.password)
        } else if ('error' in data) {
            console.error("API error", data.error)
            return String(data.error)
        } else {
            console.error('Unexpected error type:', data)
            return JSON.stringify(data)
        }
    }

    console.error('Unexpected error structure:', data)
    return JSON.stringify(data);
}