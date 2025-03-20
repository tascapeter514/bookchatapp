import { useState, useCallback, useEffect } from 'react'

export default function useSearch() {

    const [searchValue, setSearchValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


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
        
    
    const fetchData = useCallback(async (value: string) => {
            if (!value) return

            setLoading(true)
            setError(null)


            const encodedValue = encodeURIComponent(value)
            const path = encodeURI(`ws://localhost:8000/ws/search/${encodedValue}/`)
    
            try {
    
                const socket = new WebSocket(path)
    
                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === 'get_search_query') {
                        console.log('WEBSOCKET SEARCH DATA:', data)
                        setSearchResults(data.search_results)
                        
                        
                        
                    }
                }
    
                socket.onerror = (error) => {
                    console.error('Websocket search query error:', error)
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
        
        //fetch search data when debounced value changes
        useEffect(() => {
            fetchData(debouncedValue);
        }, [debouncedValue, fetchData])

        useEffect(() => {
            if (!searchValue) {
                setSearchResults([])
            }
        }, [searchValue])

    return {searchValue, searchResults, setSearchValue, fetchData, error, loading}


}