import { GET_ERRORS } from './types';



// RETURN ERRORS

export const returnErrors = (msg: string, status: string | number) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status}

    }
}