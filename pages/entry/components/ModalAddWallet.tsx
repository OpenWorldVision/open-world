import {
  Button,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'

const ModalAddWallet = ({ onAddMetamask }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Please add your wallet</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <Button
            backgroundColor={'#019C44'}
            variant="ghost"
            onClick={onAddMetamask}
            textColor={'#fff'}
          >
            Add Metamask
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ModalAddWallet
