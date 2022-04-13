pragma solidity 0.7.5;
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract HeroCore is OwnableUpgradeable {
  address public ceoAddress;
  mapping(uint256 => address) private indexToOwner;

  function initialize() public initializer {
    __Ownable_init();
  }

  function heroIndexToOwner(uint256 _heroId) public view returns (address) {
    return indexToOwner[_heroId];
  }
}
