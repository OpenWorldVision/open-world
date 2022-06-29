import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
  Box,
  Image,
  forwardRef,
} from '@chakra-ui/react'
import { useImperativeHandle, useRef } from 'react'
import ConfirmationModal, { ConfirmationModalRef } from './ConfirmationModal'
import Item from './Item'

export type ShopRef = {
  open: () => void
  close: () => void
}

function Shop(_, ref) {
  const { isOpen, onToggle } = useDisclosure()
  const confirmationRef = useRef<ConfirmationModalRef>()

  useImperativeHandle(
    ref,
    () => ({
      open: onToggle,
      close: onToggle,
    }),
    [onToggle]
  )

  return (
    <>
      <Modal isOpen={isOpen} onClose={onToggle} size="6xl" isCentered>
        <ModalOverlay />
        {/* <ModalCloseButton /> */}
        <ModalContent bgColor="transparent">
          <ModalBody>
            <Box display="flex" justifyContent="space-between" gap={8}>
              <Box bgColor="#D9D9D9" borderRadius={10} p={0} flex={2}>
                <Image
                  src="/images/shop/left-side.webp"
                  alt="left-side-shop"
                  w="100%"
                />
                <Text textAlign="center" fontSize={14} m={8} pb={8}>
                  The shop was set up by the government, providing essential
                  items to support new residents.
                </Text>
              </Box>
              <Box bgColor="#D9D9D9" borderRadius={10} p={4} flex={3}>
                <Box
                  position="absolute"
                  right={'25%'}
                  top={-2}
                  bgColor="#CFB183"
                  p="8px 12px"
                  borderRadius={10}
                >
                  <Text fontSize={16} fontWeight="black">
                    Selling Items
                  </Text>
                </Box>
                <Item onBuy={confirmationRef.current?.open} />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ConfirmationModal ref={confirmationRef} />
    </>
  )
}

export default forwardRef<ShopRef, any>(Shop)
