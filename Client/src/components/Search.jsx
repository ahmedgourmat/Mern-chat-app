import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box , Button , Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, DrawerContent, DrawerCloseButton, useDisclosure, Radio, RadioGroup, Input } from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'
import axios from 'axios'
import Users from './Users'
import { UserState } from '../context/UserContext'

function Search() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search , setSearch] = useState('')
    const [data , setData] = useState([])
    const {user} = UserState()
    const [loading, setLoading] = useState(false)

    const searchUsers = async()=>{
        const response = await axios.get(`http://localhost:8080/api/v1/user?search=${search}`,{
            headers: {
            Authorization: 'Bearer ' + user.token,
            },
        })

        if(response.status>= 200 || response.status < 300 ){
            setData(response.data)
            return
        }


    }

    

  const createChat = async (id) => {

    setLoading(true)

    const response = await axios.post('http://localhost:8080/api/v1/chat', { userId: id }, {
      headers: {
        Authorization: 'Barear ' + user.token
      }
    })

    if (response.status >= 200 || response.status < 300) {
      console.log('here')
      console.log(response.data)
      setLoading(false)
      return
    }

    console.log(response)

    setLoading(false)
  }
  

    useEffect(()=>{
        const fetchingData = async()=>{


            const response = await axios.get(`http://localhost:8080/api/v1/user?search=`,{
                headers: {
                  Authorization: 'Bearer ' + user.token
                },
              })

            if(response.status>= 200 || response.status < 300 ){
                setData(response.data)
                return
            }

        }

        fetchingData()
    },[])

  return (
    <Box>
      <Button colorScheme='blue' onClick={onOpen} display='flex' alignItems='center' gap='10px' >
        Search User
        <SearchIcon/>
      </Button>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent >
          <Box
            display='flex'
            alignItems='flex-end'
            gap='5px'
          >
            <Input 
                variant='flushed'
                padding='5px 10px'  
                placeholder='Search Users'
                onChange={(e)=>setSearch(e.target.value)}
                value={search}
            />
            <Button colorScheme='blue'
              onClick={searchUsers}
            >Search</Button>
          </Box>
          <DrawerBody
            display='flex'
            flexDir='column'
            gap='10px'
          >
            {
                data.map((elem)=>(
                    <Users key={elem._id} name={elem.name} picture={elem.picture} id={elem._id} onClose={onClose} functionHandler={createChat} /> 
                ))
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Search
