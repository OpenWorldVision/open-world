import { useCallback, useMemo } from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Popup from '@components/Popup'

export enum TRANSACTION_STATE {
  FAILED = 0,
  SUCCESSFUL,
  WAITING,
  NOT_EXECUTED,
}

function useTransactionState() {
  const blockExplorer = useMemo(() => {
    const chainId = window?.ethereum?.chainId
    switch (chainId) {
      // BSC testnet
      case '0x61':
        return 'https://testnet.bscscan.com/tx/'
      case '0x38':
        return 'https://bscscan.com/tx/'
      // Harmony tesnet
      case '0x6357d2e0':
      case '0x6357d2e1':
      case '0x6357d2e2':
      case '0x6357d2e3':
        return 'https://explorer.pops.one/tx/'
      // Harmony mainet
      case '0x63564c40':
      case '0x63564c41':
      case '0x63564c42':
      case '0x63564c43':
        return 'https://explorer.harmony.one/tx/'
    }
  }, [])

  const handleTxStateChange = useCallback(
    (title, txHash, txResult: TRANSACTION_STATE, handlePopup) => {
      switch (txResult) {
        case TRANSACTION_STATE.FAILED:
          handlePopup(
            "failed",
            title + ' transaction is failed', 
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={blockExplorer + txHash}
            />
          )
          return null
        case TRANSACTION_STATE.SUCCESSFUL:
          handlePopup(
            'success',
            title + ' transaction is successful',
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={blockExplorer + txHash}
            >
              Transaction detail <ExternalLinkIcon mx="2px" />
            </a>
          )
          return null
        case TRANSACTION_STATE.WAITING:
          handlePopup(
            'waiting',
            title + ' transaction is excuting',
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={blockExplorer + txHash}
            >
              Transaction detail <ExternalLinkIcon mx="2px" />
            </a>
          )
          return null
        case TRANSACTION_STATE.NOT_EXECUTED:
          handlePopup(
            'cancel',
            title + ' transaction is failed to execute',
            null
          )
          return null
      }
    },
    [blockExplorer]
  )

  return handleTxStateChange
}

export default useTransactionState
