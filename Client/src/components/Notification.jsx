import React, { useEffect } from 'react'
import { UserState } from '../context/UserContext'
import { Box, Button, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'

function Notification() {

    const { notification, setNotification ,setSelectedChat } = UserState()


    useEffect(() => {
        console.log('from notification jsx', notification)
    }, [notification])

    return (
        <Menu>
            <MenuButton
                position='relative'
                _after={notification.length > 0 ? {
                    content: '" "',
                    bg: 'red',
                    borderRadius: '50%', 
                    height: '10px',
                    width: '10px',
                    position: 'absolute',
                    right: '0px',
                    top: '0px'
                } : {}}
                as={Button}
            >
                notification
            </MenuButton>
            <MenuList>

                {

                    notification.length
                        ?
                        notification.slice(0,4).map(elem => (
                            <MenuItem>
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='10px'
                                    width='240px'
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                    onClick={()=>{
                                        setSelectedChat(elem.chat)
                                        setNotification(notification.filter(notf=>{
                                            return notf.sender._id != elem.sender._id
                                        }))
                                    }}
                                >
                                    <Image
                                        borderRadius='full'
                                        boxSize='30px'
                                        src={elem.sender.picture}
                                        alt='Dan Abramov'
                                    />
                                    <Box>
                                        <Text fontSize='xl' isTruncated width='100%'  textOverflow='ellipsis' >{elem.sender.name}</Text>
                                        <Text fontSize='l' isTruncated width='100%'  textOverflow='ellipsis' >message : {elem.content}</Text>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))

                        :
                        <Text
                            textAlign='center'
                            fontSize='xl'
                        >
                            no notifications
                        </Text>
                }

            </MenuList>
        </Menu>
    )
}

export default Notification
