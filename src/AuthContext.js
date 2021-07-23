import React,{ useEffect,useState,createContext, useContext} from 'React'
import {useHistory} from 'react-router-dom'
import {auth} from './firebase'

const authContext = createContext()

export const useAuth =() => useContext(authContext)


export const AuthProvider = ({children})=>{
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            setuser(user)
            setLoading(false)
            
            if(user) history.push('./chats')
            
        })
    }, [user, loading])

    const value = {user}

    return (
        <authContext.Provider value={value}>
            {!loading && children}
        </authContext.Provider>
    )
}