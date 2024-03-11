import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure , Button, Input, Box, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserState } from '../context/UserContext'
import Users from './Users'
import AddUsers from './AddUsers'

function CreatGroupModel({children}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupName , setGroupName] = useState('')
    const [userName , setUserName] = useState('')
    const [users , setUsers] = useState([])
    const [data , setData ] = useState([])
    const [loading , setLoading] = useState(false)
    const {user} = UserState()

    const searchHandler = async(e)=>{

        setLoading(true)
        const config = {
            headers : {
                Authorization : 'Barear ' + user.token
            }
        }
        const searchValue = e.target.value

        const response = await axios.get(`http://localhost:8080/api/v1/user?search=${searchValue}`,config)

        if( response.status>= 200 || response.status< 300 ){
            setData(response.data)
            setLoading(false)
            return
        }

        console.log(response)
        setLoading(false)
    }

    const addUsers = (id , user)=>{
        setUsers((prevUsers) => [...prevUsers, user]);
    }
    

    const deleteUser = (id)=>{
        setUsers(
            users.filter(elem => elem._id !== id)
        )
    }


    const createGroup = async()=>{

        const config = {
            headers : {
                Authorization : 'Barear ' + user.token
            }
        }

        const response = await axios.post('http://localhost:8080/api/v1/chat/group',{
            chatName : groupName,
            usersId : JSON.stringify(users)
        },config)

        if( response.status>= 200 || response.status< 300 ){
            
            onClose()
            return
        }

        console.log(response.data)

    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>CREATE GROUP</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input onChange={(e)=>{setGroupName(e.target.value)}} value={groupName} variant='flushed' placeholder='Group name' />
                        <Input onChange={searchHandler} variant='flushed' placeholder='Add group memeber e.g: Ahmed , Lyna .. ' />
                        <Box
                            display='flex'
                            gap='5px'
                            alignItems='center'
                            flexWrap='wrap'
                        >
                            {
                                users.length 
                                ? 
                                    users.map((elem)=>(
                                        <AddUsers name={elem.name} key={elem._id} deleteHandler={deleteUser} id={elem._id} /> 
                                    ))
                                : 
                                    <Text textAlign='center' mt='5px' >
                                        Add Members
                                    </Text>
                            }
                        </Box>
                        {
                            !loading ?
                            <Box
                                mt='10px'
                                display='flex'
                                flexDir='column'
                                gap='10px'
                            >
                                {
                                    data.slice(0,4).map((elem)=>(
                                        <Users key={elem._id} user={elem} name={elem.name} picture={elem.picture} id={elem._id} functionHandler={addUsers} /> 
                                    ))
                                }
                            </Box> 
                            : 
                            <Text mt='10px' textAlign='center'>Loading...</Text>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button bg='#24db40' color='white' mr={3} onClick={createGroup} >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatGroupModel
