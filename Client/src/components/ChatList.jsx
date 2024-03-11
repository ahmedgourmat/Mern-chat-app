import { AddIcon } from '@chakra-ui/icons'
import { Box , Button, ButtonGroup, IconButton, Skeleton, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect , useState } from 'react'
import OneChat from './OneChat'
import CreatGroupModel from './CreatGroupModel'
import { UserState } from '../context/UserContext'

function ChatList() {

    const {selectedChat , setSelectedChat} = UserState()

    const [data , setData] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        const fetchingChat = async()=>{


            const userInfo = JSON.parse(localStorage.getItem('user'))

            const response = await axios.get('http://localhost:8080/api/v1/chat',{
                headers : {
                    Authorization : 'Barear ' + userInfo.token
                }
            })

            if(response.status>= 200 || response.status < 300 ){
                setData(response.data)
                setLoading(false)
                return
            }

            setLoading(false)

        }

        fetchingChat()
    },[data])

  return (
    <Box
        bgColor='white'
        width='40%'
        height='calc(100vh - 100px)'
        borderRadius='5px'
        padding='20px'
        overflowY='scroll'
    >
        <Box 
            display='flex'
            alignItems='center'
            width='100%'
            justifyContent='space-between'
        >
            <Text fontSize='4xl'>My Chat</Text>
            {/* <ButtonGroup size='sm' isAttached variant='Unstyled' backgroundColor='#d8dfdf' borderRadius='5px'>
                <CreatGroupModel>
                    <Button>New Group</Button>
                </CreatGroupModel>
                <IconButton aria-label='Add to friends' icon={<AddIcon />} />
            </ButtonGroup> */}
        </Box>

        <Box
            pt='20px'
            display='flex'
            flexDir='column'
            gap='10px'
            w='100%'
            alignItems='center'
        >
            {
                    loading 
                    ? 
                    <Box padding='6' boxShadow='lg' bg='white' w='100%'  gap='20px' display='flex' alignItems='center'>
                        <Box w='100%' gap='20px' display='flex' alignItems='center'>
                            <SkeletonCircle size='50px' />
                            <Box w='50%' display='flex' flexDirection='column' gap='5px'>
                                <Skeleton height='10px' mb='5px'/>
                                <Skeleton height='10px' mb='5px'/>
                            </Box>
                        </Box>
                        
                    </Box>
                    : 
                    data.map((elem) => (
                        <OneChat
                            chat={elem}
                            key={elem._id}
                            users={elem.users}
                            message={elem.latestMessage}
                            isSelected={selectedChat === elem}
                            onSelect={(chat)=>{setSelectedChat(chat)}}
                        />
                    ))

            }
        </Box>

    </Box>
  )
}

export default ChatList
