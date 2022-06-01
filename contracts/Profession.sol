pragma solidity 0.7.5;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import './Item.sol';
import './Profile.sol';

contract Profession is AccessControlUpgradeable {
  using SafeMath for uint256;

  bytes32 public constant MODERATOR_ROLE = keccak256('MODERATOR_ROLE');
  struct Quest {
    uint256 startTime;
    bool finish;
  }
  mapping(address => Quest) openianFishingQuest;
  mapping(address => Quest) openianMiningQuest;

  uint256 public fishingDuration;
  uint256 public miningDuration;

  uint256 public fishingStaminaRequire;
  uint256 public miningStaminaRequire;

  uint256 public fishRequireMakeSushi;
  uint256 public oreRequireMakeHammer;

  uint256 public constant maxStamina = 10000;
  uint256 public constant secondsPerStamina = 7; // Reduce 420 point per hour

  Item public item;
  Profiles public profiles;

  function initialize(address _item, address _profile) public initializer {
    __AccessControl_init();

    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    grantRole(MODERATOR_ROLE, msg.sender);

    item = Item(_item);
    profiles = Profiles(_profile);
  }

  function startFishing(uint256 _idSushi1, uint256 _idSushi2)
    public
    returns (bool)
  {
    require(
      item.ownerOf(_idSushi1) == msg.sender &&
        item.ownerOf(_idSushi2) == msg.sender,
      'Not own sushi'
    );
    require(item.get(_idSushi1) == 4 && item.get(_idSushi2) == 4, 'Not sushi');
    item.burn(_idSushi1);
    item.burn(_idSushi2);
    (uint256 startTime, ) = getFishingQuest(msg.sender);
    require(startTime == 0, 'Not finish last quest');
    uint256 oldStamina = profiles.getStaminaByAddress(msg.sender);
    require(oldStamina >= fishingStaminaRequire, 'Not enough stamina');
    openianFishingQuest[msg.sender] = Quest(block.timestamp, false);
    profiles.setStamina(msg.sender, oldStamina.sub(fishingStaminaRequire));
    return true;
  }

  function finishFishing() public returns (bool) {
    (uint256 startTime, bool finish) = getFishingQuest(msg.sender);
    require(!finish, 'This quest is finish');
    require(block.timestamp >= startTime.add(fishingDuration), 'Wait more');
    item.mint(msg.sender, 1);
    item.mint(msg.sender, 1);
    openianFishingQuest[msg.sender] = Quest(0, true);
    return true;
  }

  function startMining(uint256 _idHammer1, uint256 _idHammer2)
    public
    returns (bool)
  {
    require(
      item.ownerOf(_idHammer1) == msg.sender &&
        item.ownerOf(_idHammer2) == msg.sender,
      'Not own hammer'
    );
    require(
      item.get(_idHammer1) == 3 && item.get(_idHammer2) == 3,
      'Not hammer'
    );
    item.burn(_idHammer1);
    item.burn(_idHammer2);
    (uint256 startTime, ) = getMiningQuest(msg.sender);
    require(startTime == 0, 'Not finish last quest');
    uint256 oldStamina = profiles.getStaminaByAddress(msg.sender);
    require(oldStamina >= miningStaminaRequire, 'Not enough stamina');
    openianMiningQuest[msg.sender] = Quest(block.timestamp, false);
    profiles.setStamina(msg.sender, oldStamina.sub(miningStaminaRequire));
    return true;
  }

  function finishMining() public returns (bool) {
    (uint256 startTime, bool finish) = getMiningQuest(msg.sender);
    require(!finish, 'This quest is finish');
    require(block.timestamp >= startTime.add(fishingDuration), 'Wait more');
    item.mint(msg.sender, 2);
    item.mint(msg.sender, 2);
    openianMiningQuest[msg.sender] = Quest(0, true);
    return true;
  }

  function makeSushi(uint256 idUpgrade, uint256 idBurn) public {
    require(
      item.ownerOf(idUpgrade) == msg.sender &&
        item.ownerOf(idBurn) == msg.sender,
      'Not owner of token'
    );
    require(item.get(idUpgrade) == 1 && item.get(idBurn) == 1, 'Not fish');
    item.burn(idBurn);
    item.setTrait(idUpgrade, 4);
  }

  function makeMultiSushi(uint256[] calldata _ids) public {
    require(_ids.length > 2 && _ids.length.mod(2) == 0, 'Invalid');
    for (uint256 index = 0; index < _ids.length; index += 2) {
      makeSushi(_ids[index], _ids[index + 1]);
    }
  }

  function makeHammer(uint256 idUpgrade, uint256 idBurn) public {
    require(
      item.ownerOf(idUpgrade) == msg.sender &&
        item.ownerOf(idBurn) == msg.sender,
      'Not owner of token'
    );
    require(item.get(idUpgrade) == 2 && item.get(idBurn) == 2, 'Not fish');
    item.burn(idBurn);
    item.setTrait(idUpgrade, 3);
  }

  function makeMultiHammer(uint256[] calldata _ids) public {
    require(_ids.length > 2 && _ids.length.mod(2) == 0, 'Invalid');
    for (uint256 index = 0; index < _ids.length; index += 2) {
      makeHammer(_ids[index], _ids[index + 1]);
    }
  }

  function getFishingQuest(address _account)
    public
    view
    returns (uint256 startTime, bool finish)
  {
    startTime = openianFishingQuest[_account].startTime;
    finish = openianFishingQuest[_account].finish;
  }

  function getMiningQuest(address _account)
    public
    view
    returns (uint256 startTime, bool finish)
  {
    startTime = openianMiningQuest[_account].startTime;
    finish = openianMiningQuest[_account].finish;
  }

  function setMiningDuration(uint256 _duration) public {
    require(hasRole(MODERATOR_ROLE, msg.sender), 'Not moderator');
    miningDuration = _duration;
  }

  function setFishingDuration(uint256 _duration) public {
    require(hasRole(MODERATOR_ROLE, msg.sender), 'Not moderator');
    fishingDuration = _duration;
  }
}
