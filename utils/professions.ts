import { ethers } from 'ethers'

// Contracts
const professionsContract = {
  address: '0x87461de8692ead1de9ee628ff25d97ae393ea162',
  jsonInterface: require('../build/contracts/Profiles.json'),
}

const heroCoreContract = {
  address: '0xE8977C9E35a8aCa6cB179681433062d38043FB58',
  jsonInterface: require('../build/contracts/HeroCore.json'),
}

// Create contracts
const getProfessionsContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId
  let contractAddress = professionsContract.address

  if (chainId === '0x61') {
    contractAddress = '0xe6046d1363f7bebff6cb98c72094c89ff8ee500d'
  }

  return new ethers.Contract(
    contractAddress,
    professionsContract.jsonInterface.abi,
    provider.getSigner()
  )
}

const getHeroCoreContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId
  let contractAddress = heroCoreContract.address

  if (chainId === '0x61') {
    contractAddress = '0x176A3D8BfA7CC02a44515f2770261030c95e34A7'
  }

  return new ethers.Contract(
    contractAddress,
    heroCoreContract.jsonInterface.abi,
    provider.getSigner()
  )
}

// Call Methods
export const fetchRequireBalanceProfession = async () => {
  const contract = await getProfessionsContract()
  const balance = await contract.requireBalanceProfession()
  return balance.toNumber()
}

export const mintProfessionNFT = async (trait) => {
  const contract = await getHeroCoreContract()
  const currentAddress = await window.ethereum.selectedAddress
  await contract.mint(currentAddress, trait)
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
  const contract = await getProfessionsContract()
  const checkSuccess = await contract.setProfession(profession)
  return checkSuccess
}