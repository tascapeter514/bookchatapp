import { useCallback, useReducer, Reducer, useState } from 'react'
import { ActiveUser } from '../types'
import { useGetUsersMutation } from '../slices/bookclubApiSlice'



interface Props {
    bookclubId: number
}

export default function useGetUsers({bookclubId}: Props) {


    const [results, setResults] = useState<ActiveUser[]>([])
    const [getUsers, {isError, error, isLoading}] = useGetUsersMutation()

    const handleGetUsers = async () => {

        try {
            const response = await getUsers(bookclubId).unwrap()

            console.log('get users response:', response)

            



        } catch (error: any) {

            console.error('There was an error retrieving users:', error)

        }
    }

    
   


    
}