import './Searchbar.css'
import { FC, useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'


type IconProps = React.ComponentPropsWithoutRef<'svg'>


const SearchIcon: FC<IconProps> = (props) => {
    return  <FaSearch {...props}></FaSearch>
}

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);


    useEffect(() => {
        const id = setTimeout(() => {
            console.log('setting new timeout')
            setDebouncedValue(value)
        }, delay)

        return () => {

            console.log('clearing timeout')
            clearTimeout(id)
        }
    }, [value, delay])
    return debouncedValue
}




const Searchbar: FC = () => {

    const [searchValue, setSearchValue] = useState('')

    
    const debouncedSearchValue = useDebounce(searchValue, 500)
    
    const fetchSearchData = (value: string) => {



        const encodedValue = encodeURIComponent(value)


        const path = encodeURI(`ws://localhost:8000/ws/search/${encodedValue}/`)
        console.log("path:", path)

        try {

            const socket = new WebSocket(path)

            
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'get_search_query') {
                    console.log('web socket search query:', data)
                }
            }

            socket.onerror = (error) => {
                console.error('Websocket search query error:', error)
            }

            socket.onopen = () => console.log('Search query websocket connected')
            socket.onclose = () => console.log('Search query websocket disconnected')

            return () => socket.close()


        } catch (err) {
            console.error(`Search websocket failed to initialize: ${err}`)
        }
        
    }
    



    useEffect(() => {
        if (debouncedSearchValue) {
            fetchSearchData(debouncedSearchValue)
        }
    }, [debouncedSearchValue])



    return(

            <div className="input-wrapper">
            
                <input  
                    placeholder='Type to search...' 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)} />
                <SearchIcon className='search-icon'/>

            </div>



    )
}

export default Searchbar


// const fetchSearchData = async (value: string) => {
//     console.log('fetch check:', value)
//     const baseUrl = `http://localhost:8000/api/search/${value}`
    



//     try {
//         const response = await fetch(baseUrl)

//         if (response.ok) {
//             const data = response.json()
//             console.log('search query data:', data)
//         }

//     } catch (err) {
//         console.error('There was an error with the search connection:', err)
//     }

// }