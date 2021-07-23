import React,{useHistory,useHistory} from 'react'
import {useHistory} from 'react-router-dom'
import {auth} from '../firebase'
import {ChatEngine} from 'react-chat-engine'

import {useAuth} from '../AuthContext'
import axios from 'axios'


function Chats() {

    const {user} = useAuth()
    const history= useHistory()
    
    const handleLogout =()=>{
        auth.signOut()

        history.push("/")
    }

    useEffect(() => {
        if (!user){
            history.push('/')
            return ;
        }

        const getFile = async (url) =>{
            const response = await fetch(url)
            const data = await response.blob()

            return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers:{
                "project-id":process.env.REACT_APP_ENGINE_ID,
                "user-name":user.email,
                "user-secret":user.uuid
            }
        })
        .then(()=>{
            setLoading(false)
        }) .catch(()=>{
            let formData = new FormData()
            formData.append("email", user.email)
            formData.append("username", user.email)
            formData.append("secret", user.uid)

            getFile(user.photoURL)
            .then(()=>{
                formData.append("avatar", avatar, avatar.name)
                axios.post('https://api.chatengine.io/users',
                formData,
                {
                    headers:{"private-key": process.env.REACT_APP_ENGINE_KEY}
                })
            }) .then(()=> setLoading(false))
                .catch(err => console.log(err))
        })
    }, [user, history])

    if(!user || loading) return "loading ..."

    return (
        <div className="chats-pages">
            <div className="nav-bar">
            <div className="logo-tab">Unichat</div>
            <div className="logout-tab" onClick={handleLogout}>Logout</div>
            </div>

            <ChatEngine height="calc(100vh - 66px)" 
            projectID={REACT_APP_ENGINE_ID}
            userName={user.email}
            userSecret={user.uid}
            />
        </div>
    )
}

export default Chats
