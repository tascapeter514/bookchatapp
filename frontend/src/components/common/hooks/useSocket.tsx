import { useEffect, useState, useCallback } from 'react'


export default function useSocket(url: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error>(false)
    const [data, setData] = useState(null)

    const makeRequest = useCallback( async () => {

        setLoading(true)
        

    }, [])



    useEffect(() => {
        // if (!activeUser?.id) return
  
        try {
          const socket = new WebSocket(url)
  
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'get_user_data') {

             
            }
          }
  
          socket.onerror = (event) => {
            console.error('WebSocket connection failed:', event)
            setError(new Error('Search websocket failed to connect'))
            socket.close();
        }
  
          socket.onopen = () => console.log('User data websocket connected')
          socket.onclose = () => console.log('User data websocket disconnected')
  
          return () => socket.close()
  
  
        } catch (err: any) {
          setError(err)
          
        } finally {
            setLoading(false)
        }
  
  
  
      }, [])

}