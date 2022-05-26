import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const professionContract = {
  addressHarmony: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  addressBSC: '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492',
  jsonInterface: require('../build/contracts/Item.json'),
}

const getItemContract = async () => {
  const chainId = await web3.eth.getChainId()

  if (chainId === 97) {
    return new web3.eth.Contract(
      professionContract.jsonInterface.abi,
      professionContract.addressBSC
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      professionContract.jsonInterface.abi,
      professionContract.addressHarmony
    )
  }
}

export const getNFTsByTrait = async (trait) => {
  const contract = await getItemContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const data = await contract.methods
      .getAmountItemByTrait(trait, accounts[0])
      .call({ from: accounts[0] })
    const listFiltered = data.filter((item) => item !== '0')
    return listFiltered
  } catch (error) {
    console.log('3124234', error)
  }
}
