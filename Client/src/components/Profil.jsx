import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { UserState } from '../context/UserContext'

function Profil({ children }) {


  const {user} = UserState()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          minWidth='40%'
          display='flex'
          flexDirection='column'
          alignItems='center'
          padding='20px'
        >
          <ModalHeader textAlign='center' fontSize='5xl'>{user.user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
            >
              <Image
                borderRadius='full'
                boxSize='150px'
                src={user.user.picture}
                alt='Dan Abramov'
              />
              <Text fontSize='4xl'>{user.user.email}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}

export default Profil
