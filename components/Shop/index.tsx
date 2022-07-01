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
  useBreakpointValue,
  useMediaQuery,
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
  const flexDirection: 'row' | 'column' = useBreakpointValue({
    xl: 'row',
    lg: 'row',
    base: 'column',
  })
  const [isMobile] = useMediaQuery('(max-width: 1014px)')

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
      <Modal isOpen={isOpen} onClose={onToggle} size="6xl">
        <ModalOverlay bg="blackAlpha.800" />

        <ModalContent bgColor="transparent" mt="5rem">
          <ModalBody>
            <Box
              display="flex"
              justifyContent="space-between"
              gap={8}
              flexDirection={flexDirection}
            >
              {isMobile ? (
                <Box bgColor="#D9D9D9" borderRadius={10} p={0} flex={2}>
                  <Image
                    src="/images/shop/main-side.webp"
                    alt="left-side-shop"
                    w="100%"
                  />
                  <Text
                    textAlign="center"
                    fontSize={14}
                    m={8}
                    pb={8}
                    position="absolute"
                    top={0}
                    color="white"
                    fontWeight="bold"
                  >
                    The shop was set up by the government, providing essential
                    items to support new residents.
                  </Text>
                </Box>
              ) : (
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
              )}
              <Box
                bgColor="#C8BB98"
                borderRadius={10}
                p={2}
                flex={3}
                position="relative"
                minH="40vh"
              >
                <Box
                  position="absolute"
                  right={0}
                  left={0}
                  ml="auto"
                  mr="auto"
                  top={-18}
                  display="flex"
                  alignItems="center"
                  w="fit-content"
                >
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="#CFB183"
                    w="-moz-fit-content"
                    p="8px 12px"
                    borderRadius={10}
                  >
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
