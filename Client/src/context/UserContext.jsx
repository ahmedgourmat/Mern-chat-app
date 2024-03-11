import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const UserInfo = React.createContext()

export function UserContext({ children }) {

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true);
  const [selectedChat , setSelectedChat] = useState(null)
  const [notification , setNotification] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const changeData = async () => {
      
      const userInfo = JSON.parse(localStorage.getItem('user'))

      if(userInfo){
        setUser(userInfo)
        navigate('/chat')
      }else{
        navigate('/')
        
      }

      setLoading(false)
    };
  
    changeData();
  }, [selectedChat]);

  
  if (loading) {
    return null;
  }

  

  return (
    <UserInfo.Provider value={{ user, setUser , selectedChat , setSelectedChat , notification , setNotification }} >
      {children}
    </UserInfo.Provider>
  )
}


export const UserState = () => {
  return useContext(UserInfo)
}

