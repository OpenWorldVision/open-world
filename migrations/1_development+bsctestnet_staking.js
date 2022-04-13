// eslint-disable-next-line @typescript-eslint/no-var-requires
const { deployProxy } = require('@openzeppelin/truffle-upgrades')

const LPStakingRewardsUpgradeable = artifacts.require(
  'StakingRewardsUpgradeable'
)

module.exports = async function (deployer, network) {
  // if (network === 'development' || network === 'development-fork' || network === 'bsctestnet' || network === 'bsctestnet-fork') {
  //   const token = await xBlade.at("0x27a339d9B59b21390d7209b78a839868E319301B");
  //   const expToken = await ExperimentToken.deployed();
  //   // const expToken2 = await ExperimentToken2.deployed();

  //   await deployProxy(xBladeStakingRewardsUpgradeable, [accounts[0], accounts[0], token.address, token.address, 60], { deployer });
  //   await deployProxy(LPStakingRewardsUpgradeable, [accounts[0], accounts[0], token.address, expToken.address, 0], { deployer });
  // }
  if (network === 'bsctestnet') {
    const ownerAddress = '0xab2525670F881fB03A478630c5E94D0b1d8c516B'
    const rewardDistributorAddress =
      '0xab2525670F881fB03A478630c5E94D0b1d8c516B'

    const openWorldTokenAddress = '0xcEC1d95e9bfFde1021B1f3C39862c6c3a5BA1A91'
    const lpTokenAddress = '0x90a1d4073772488ac3a19079cafa3bb9ed5045fe'

    await deployProxy(
      LPStakingRewardsUpgradeable,
      [
        ownerAddress,
        rewardDistributorAddress,
        openWorldTokenAddress,
        lpTokenAddress,
        8000,
      ],
      { deployer }
    )
  }
}
