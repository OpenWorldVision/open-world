import { ethers } from 'ethers'
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

// Contracts
const openWorldTokenContract = {
  addressBSC: '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B',
  jsonInterface: require('../build/contracts/ERC20.json'),
}

const professionsContract = {
  addressHarmony: '0x87461de8692ead1de9ee628ff25d97ae393ea162',
  addressBSC: '0xae46953433ebE48698c6D86a49fA154eDCad99C3',
  jsonInterface: require('../build/contracts/Profiles.json'),
}

const heroCoreContract = {
  addressHarmony: '0xE8977C9E35a8aCa6cB179681433062d38043FB58',
  addressBSC: '0x585ded8E0Dd7DCfad02F13b94571E24cA59A3234',
  jsonInterface: require('../build/contracts/HeroCore.json'),
}

// Create contracts
const getOpeWorldContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

  return new ethers.Contract(
    openWorldTokenContract.addressBSC,
    openWorldTokenContract.jsonInterface.abi,
    provider.getSigner()
  )
}

const getProfessionsContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId

  if (chainId === '0x61') {
    return new ethers.Contract(
      professionsContract.addressBSC,
      professionsContract.jsonInterface.abi,
      provider.getSigner()
    )
  } else {
    return new ethers.Contract(
      professionsContract.addressHarmony,
      professionsContract.jsonInterface.abi,
      provider.getSigner()
    )
  }
}

const getHeroCoreContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId

  if (chainId === '0x61') {
    return new ethers.Contract(
      heroCoreContract.addressBSC,
      heroCoreContract.jsonInterface.abi,
      provider.getSigner()
    )
  } else {
    return new ethers.Contract(
      heroCoreContract.addressHarmony,
      heroCoreContract.jsonInterface.abi,
      provider.getSigner()
    )
  }
}

// Call Methods
export const fetchRequireBalanceProfession = async () => {
  const contract = await getProfessionsContract()
  const balance = await contract.requireBalanceProfession()

  return balance.toNumber()
}

export const mintProfessionNFT = async (trait) => {
  const Herocore = await getHeroCoreContract()
  const OpenWorld = await getOpeWorldContract()
  const currentAddress = await window.ethereum.selectedAddress

  const allowance = await OpenWorld.allowance(
    heroCoreContract.addressBSC,
    currentAddress
  )

  if (allowance < web3.utils.toWei('1000000', 'ether')) {
    await OpenWorld.approve(
      heroCoreContract.addressBSC,
      web3.utils.toWei('1000000', 'ether')
    )
  }
  try {
    await Herocore.mint(currentAddress, trait)
    return true
  } catch {
    return false
  }
}

export const fetchUserProfessionNFT = async () => {
  const contract = await getHeroCoreContract()
  const currentAddress = await window.ethereum.selectedAddress
  const index = await contract.balanceOf(currentAddress)
  const nftList = []

  for (let i = 0; i < index.toNumber(); i++) {
    const heroId = await contract.tokenOfOwnerByIndex(currentAddress, i)
    nftList.push(await contract.getTrait(heroId.toNumber()))
  }

  return nftList
}

export const activateProfession = async (profession) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const contract = await getProfessionsContract()
  try {
    const result = await contract.setProfession(profession)

    let transactionReceipt = null
    do {
      transactionReceipt = await provider.getTransactionReceipt(result.hash)
    } while (transactionReceipt === null)

    return transactionReceipt.status
  } catch {
    return false
  }
}

export const fetchProfessionsNFTAmount = async () => {
  const contract = await getHeroCoreContract()
  const openianAmount = await contract.openianAmount()
  const supplierAmount = await contract.supplierAmount()
  const blacksmithAmount = await contract.blacksmithAmount()

  return {
    openianAmount: openianAmount.toNumber(),
    supplierAmount: supplierAmount.toNumber(),
    blacksmithAmount: blacksmithAmount.toNumber(),
  }
}

export const fetchProfessionsNFTPrices = async () => {
  const contract = await getHeroCoreContract()
  const openianPrice = await contract.openianPrice()
  const supplierPrice = await contract.supplierPrice()
  const blacksmithPrice = await contract.blacksmithPrice()

  return {
    openianPrice: ethers.utils.formatEther(openianPrice),
    supplierPrice: ethers.utils.formatEther(supplierPrice),
    blacksmithPrice: ethers.utils.formatEther(blacksmithPrice),
  }
}
