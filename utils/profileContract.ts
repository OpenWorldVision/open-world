import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const GasLimit = 800000

const profilesContract = {
  addressHarmony: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  addressBSC: '0xae46953433ebE48698c6D86a49fA154eDCad99C3',
  jsonInterface: require('../build/contracts/Profiles.json'),
}

const getProfileContract = async () => {
  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()

  if (chainId === 97) {
    return new web3.eth.Contract(
      profilesContract.jsonInterface.abi,
      profilesContract.addressBSC,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      profilesContract.jsonInterface.abi,
      profilesContract.addressHarmony,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  }
}

export const getProfile = async () => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    return await contract.methods
      .getProfileByAddress(accounts[0])
      .call({ from: accounts[0] })
  } catch {
    return false
  }
}

export async function getStamina() {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    return await contract.methods
      .getStamina(accounts[0])
      .call({ from: accounts[0] })
  } catch {
    return false
  }
}

export const crateProfile = async (nameStr: string, pictureId: number) => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    await contract.methods
      .createProfile(nameStr, pictureId)
      .send({ from: accounts[0] })
    return true
  } catch {
    return false
  }
}

export const isProfessionExist = async () => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    return await contract.methods
      .canSetProfession(accounts[0])
      .call({ from: accounts[0] })
  } catch {
    return false
  }
}

export const changePictureProfile = async (
  profileId: number,
  pictureId: number
) => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    await contract.methods
      .changePic(profileId, pictureId)
      .send({ from: accounts[0] })
    return true
  } catch {
    return false
  }
}

export const checkNameTaken = async (nameStr: string) => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    return await contract.methods.nameTaken(nameStr).call({ from: accounts[0] })
  } catch {
    return false
  }
}
