import { useCallback, useEffect, useState } from 'react'
import { ActiveUser } from '../types'
import { useGetUsersMutation } from '../slices/bookclubApiSlice'





export default function useGetUsers(bookclubId: number) {


    const [results, setResults] = useState<ActiveUser[]>()
    const [getUsers] = useGetUsersMutation()



    const handleGetUsers = async () => {

        try {
            const response = await getUsers(bookclubId).unwrap()

            console.log('get users response:', response)

            setResults(response)

        
        } catch (error: any) {

            console.error('There was an error retrieving users:', error)

        }
    }

    useEffect(() => {

        handleGetUsers()

    }, [bookclubId])
   

    return {results}
    
}