export const API_BASE = import.meta.env.PROD
? 'https://bookchatapp-2r38.onrender.com/'
: 'http://localhost:8000/'


export const WEBSOCKET_BASE = import.meta.env.PROD
    ? 'wss://bookchatapp-2r38.onrender.com'
    : 'ws://localhost:8000'