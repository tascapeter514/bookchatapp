import { useState, useCallback } from 'react'




interface WebSocketData {
    type: string,
    [key: string]: any;
}


export default function useSocket(url: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [data, setData] = useState<WebSocketData | null>(null)

    const makeRequest = useCallback( async (id: number) => {

        setLoading(true)
        try {
            const socket = new WebSocket(`${url}/${id}`)
    
            socket.onmessage = (event) => {
            //   const data = JSON.parse(event.data);
                console.log('use socket data:', JSON.parse(event.data))
                setData( JSON.parse(event.data))
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

    

    return {loading, error, data, setData, makeRequest}

}