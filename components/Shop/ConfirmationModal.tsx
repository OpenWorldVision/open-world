import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  Text,
  Box,
  Image,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react'
import LoadingModal from '@components/LoadingModal'
import Button from '@components/theme/components/Button'
import { utils } from 'ethers'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'

import {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { buyFirstHammer, getHammerPrice } from 'utils/Item'
import Price from './Price'

export type ConfirmationModalRef = {
  open: () => void
  close: () => void
}

function ConfirmationModal(_, ref) {
  const [price, setPrice] = useState(0)
  const { isOpen, onToggle } = useDisclosure()
  const [buyAmount, setBuyAmount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState(null)
  const handleTxStateChange = useTransactionState()

  useEffect(() => {
    ;(async () => {
      const _price = await getHammerPrice()
      setPrice(Number(utils.formatEther(_price)))
    })()
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      open: onToggle,
      close: onToggle,
    }),
    [onToggle]
  )

  const handleChangeBuyAmount = useCallback((_, value: number) => {
    setBuyAmount(value)
  }, [])

  const handleConfirm = useCallback(async () => {
    setLoading(true)
    await buyFirstHammer((hash) => {
      handleTxStateChange('Buy first hammer', hash, TRANSACTION_STATE.WAITING, setPopup)
    })
    setLoading(false)
    onToggle()
  }, [handleTxStateChange, onToggle])

  return (
    <Modal isOpen={isOpen} onClose={onToggle} isCentered>
      <ModalOverlay />
      <ModalContent bgColor="#C8BB98">
        <ModalCloseButton />
        <ModalBody>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Text textAlign="center" fontWeight="bold" mb={8} mt={4}>
              Buy Items
            </Text>
            <Box
              p={0.4}
              minW={68}
              alignItems="center"
              justifyContent="center"
              mb={10}
              display="flex"
              flexDirection="column"
            >
              <Image
                src="/images/shop/stone-pickaxe.webp"
                width={68}
                height={68}
                alt="icon-sushi"
                p={2}
                background="linear-gradient(180deg, rgba(129, 129, 129, 0.7) 0%, rgba(213, 213, 213, 0.7) 100%)"
              />
              <Text fontSize={14} fontWeight="medium" mt={2} mb={2}>
                Stone Pickaxe
              </Text>
              <Text fontSize={10}>
                necessary tools for minning, made of black rock in the steep
                mountains.
              </Text>
              <Box bgColor="#DCD7C1" borderRadius={10} p={4} mt={22}>
                <Box display="flex" alignItems="center" gap={8}>
                  <Text fontSize={12} fontWeight="medium">
                    Price
                  </Text>
                  <Price price={price} />
                </Box>
              </Box>
            </Box>
            <NumberInput
              defaultValue={1}
              min={1}
              max={2}
              onChange={handleChangeBuyAmount}
              isDisabled
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mt={8}
            >
              <Text fontWeight="bold" mr={2}>
                Total
              </Text>
              <Price price={buyAmount * price} />
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter display="flex" alignItems="center" justifyContent="center">
          <Button onClick={handleConfirm} isLoading={loading}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
      {popup}
    </Modal>
  )
}

export default forwardRef<ConfirmationModalRef, any>(ConfirmationModal)
