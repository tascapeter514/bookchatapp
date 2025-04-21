import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useSearch(url: string) {

    const [searchValue, setSearchValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null)
    const location = useLocation()

    // fetch data from backend when search value is active
    const fetchData = useCallback(async (value: string) => {
            if (!value) return

            setLoading(true)
            setError(null)


            const encodedValue = encodeURIComponent(value)
            const path = encodeURI(`${url}${encodedValue}/`)
    
            try {
    
                const socket = new WebSocket(path)
    
                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                // REFACTOR
                    const {type, ...payload} = data

                    if (payload) {
                        setSearchResults(payload.search_results)
                    }
                }   
    
                socket.onerror = (event) => {
                    console.error('WebSocket connection failed:', event)
                    setError(new Error('Search websocket failed to connect'))
                    socket.close();
                }
    
                socket.onopen = () => console.log('Search query websocket connected')
                socket.onclose = () => console.log('Search query websocket disconnected')
    
                return () => socket.close()
    
            } catch (err: any) {
                setError(err)
            } finally {

                setLoading(false)
            }
            
        }, [])

        // set debounce when search value changes
        useEffect(() => {
            const id = setTimeout(() => {
                console.log('setting new timeout')
                setDebouncedValue(searchValue)
            }, 500)
        
            return () => {
                console.log('clearing timeout')
                clearTimeout(id)
                }
            }, [searchValue])
        
        //fetch search data when debounced value changes
        useEffect(() => {

            fetchData(debouncedValue)
        
            
        }, [debouncedValue, fetchData])

        // set search value to empty string when location pathname changes
        useEffect(() => {
            setSearchValue('')

        }, [location.pathname])

        // set search results to empty array if no search value
        useEffect(() => {
            if (!searchValue) {
                setSearchResults([])
            }
        }, [searchValue])

        
    // console.log('use search results', searchResults)
    return {searchValue, searchResults, setSearchValue, fetchData, error, loading}


}