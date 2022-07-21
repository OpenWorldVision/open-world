import { Flex, Box, Button, Heading, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type Props = {
  isOpen: boolean
  toggleNotification: () => void
}

function MobileNotification({ isOpen, toggleNotification, children }: PropsWithChildren<Props>) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={toggleNotification}
      closeOnOverlayClick
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent bg="#F0E0D0" boxShadow="none" w="95vw" h="500px" p="10px">
        <Flex p="14px" justify="space-between" align="center" flexDirection="column" w="100%" h="100%" backgroundImage="url('/images/modal/notification-bg.webp')">
          <Heading size="lg" textAlign="center" color="#472805">NOTIFICATION</Heading>

          {children}

          <Box>
            <Button
              bg="#472805"
              color="#fff"

              onClick={toggleNotification}
            >
              Close
            </Button>
          </Box>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default MobileNotification
