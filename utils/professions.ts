import { getAddresses } from 'constants/addresses'
import { ethers } from 'ethers'
import Web3 from 'web3'
import profilesInterface from '../build/contracts/Profiles.json'
import { getOpenWorldContract } from './openWorldContract'
import heroInterface from '../build/contracts/HeroCore.json'

const web3 = new Web3(Web3.givenProvider)

const getProfilesContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = await web3.eth.getChainId()
  const profileAddress = getAddresses(chainId).PROFILES

  return new ethers.Contract(
    profileAddress,
    profilesInterface.abi,
    provider.getSigner()
  )
}

const getHeroCoreContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const { chainId } = await provider.getNetwork()
  const heroAddress = getAddresses(chainId).HERO_CORE

  return new ethers.Contract(
    heroAddress,
    heroInterface.abi,
    provider.getSigner()
  )
}

// Call Methods
export const fetchRequireBalanceProfession = async () => {
  const contract = await getProfilesContract()
  const balance = await contract.requireBalanceProfession()

  return balance.toNumber()
}

export const mintProfessionNFT = async (trait) => {
  const HeroCore = await getHeroCoreContract()
  const OpenWorld = await getOpenWorldContract()
  const currentAddress = await window.ethereum.selectedAddress

  const allowance = await OpenWorld.allowance(currentAddress, HeroCore.address)

  if (allowance < web3.utils.toWei('1000000', 'ether')) {
    await OpenWorld.approve(
      HeroCore.address,
      web3.utils.toWei('1000000', 'ether')
    )
  }
  try {
    await HeroCore.mint(currentAddress, trait)
    return true
  } catch (e) {
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
    const trait = await contract.getTrait(heroId.toNumber())
    nftList.push({ heroId: heroId.toNumber(), trait })
  }

  return nftList
}

export const activateProfession = async (profession, heroId) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const contract = await getProfilesContract()
  try {
    const result = await contract.setProfession(profession, heroId)

    let transactionReceipt = null
    do {
      transactionReceipt = await provider.getTransactionReceipt(result.hash)
    } while (transactionReceipt === null)

    return transactionReceipt.status
  } catch (e) {
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
