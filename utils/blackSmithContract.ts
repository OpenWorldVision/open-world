import { ethers } from 'ethers'
import Web3 from 'web3'
import { nftMarketContract } from './NFTMarket'

const web3 = new Web3(Web3.givenProvider)

const GasLimit = 800000

const itemContract = {
  //Hiện tại chưa có Harmony
  addressHarmony: '0x87461de8692ead1de9ee628ff25d97ae393ea162',
  addressBSC: '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492',
  jsonInterface: require('../build/contracts/Item.json'),
}

const marketPlaceContract = {
  //Hiện tại chưa có Harmony
  addressHarmony: '0x87461de8692ead1de9ee628ff25d97ae393ea162',
  addressBSC: '0x7210aEaF0c7d74366E37cfB37073cB630Ac86B5b',
  jsonInterface: require('../build/contracts/NFTMarket.json'),
}

const professionsContract = {
  addressHarmony: '0x87461de8692ead1de9ee628ff25d97ae393ea162',
  addressBSC: '0xf1FB61D2f353C8e612E201Ed8bb9Fb6FB4CC8673',
  jsonInterface: require('../build/contracts/Profession.json'),
}

const getItemContract = async () => {
  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()

  if (chainId === 97) {
    return new web3.eth.Contract(
      itemContract.jsonInterface.abi,
      itemContract.addressBSC,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      itemContract.jsonInterface.abi,
      itemContract.addressHarmony,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  }
}

const getmarketPlaceContract = async () => {
  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()

  if (chainId === 97) {
    return new web3.eth.Contract(
      marketPlaceContract.jsonInterface.abi,
      marketPlaceContract.addressBSC,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      marketPlaceContract.jsonInterface.abi,
      marketPlaceContract.addressHarmony,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  }
}

const getprofessionsContract = async () => {
  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()

  if (chainId === 97) {
    return new web3.eth.Contract(
      professionsContract.jsonInterface.abi,
      professionsContract.addressBSC,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      professionsContract.jsonInterface.abi,
      professionsContract.addressHarmony,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  }
}

const getProfessionsEtherContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId

  if (chainId === '0x61') {
    return new ethers.Contract(
      professionsContract.addressBSC,
      professionsContract.jsonInterface.abi,
      provider.getSigner()
    )
  }
}

export const fetchAmountItemByTrait = async (hammer: number) => {
  const contract = await getItemContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const data = await contract.methods
      .getAmountItemByTrait(hammer, accounts[0])
      .call({ from: accounts[0] })
    const listFiltered = data.filter((item) => item !== '0')
    const listFilteredNumber = listFiltered.map((item) => Number(item))
    return listFilteredNumber
  } catch (err) {
    return false
  }
}

export const makeHammer = async (listOre: Array<number>) => {
  const contract = await getprofessionsContract()
  const accounts = await web3.eth.getAccounts()

  try {
    await contract.methods.makeMultiHammer(listOre).send({ from: accounts[0] })
    return true
  } catch (err) {
    return false
  }
}

export const sellHammer = async (arrayHammer: Array<number>, price: number) => {
  const contract = await getmarketPlaceContract()
  const accounts = await web3.eth.getAccounts()
  const item = await getItemContract()

  try {
    const isApprovedMarket = await item.methods
      .isApprovedForAll(accounts[0], nftMarketContract.addressBSC)
      .call({ from: accounts[0] })

    if (!isApprovedMarket) {
      await item.methods
        .setApprovalForAll(nftMarketContract.addressBSC, true)
        .send({ from: accounts[0] })
    }

    await contract.methods
      .addMultiListing(itemContract.addressBSC, arrayHammer, price)
      .send({ from: accounts[0] })
    return true
  } catch (err) {
    return false
  }
}
