pragma solidity 0.7.5;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';

contract LandAuction is AccessControlUpgradeable {
  struct Land {
    uint256 id;
    address owner;
    bool forSale;
    uint8 region;
    uint8 tier;
  }
  bytes32 public constant MODERATOR_ROLE = keccak256('MODERATOR_ROLE');

  mapping(uint256 => Land) public Lands;

  function initialize() public initializer {
    __AccessControl_init();

    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }
}
