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

  function startFishing() public returns (bool) {
    (uint256 startTime, ) = getFishingQuest(msg.sender);
    require(startTime == 0, 'Not finish last quest');
    uint256 oldStamina = profiles.getStamina(msg.sender);
    require(oldStamina >= fishingStaminaRequire, 'Not enough stamina');
    openianFishingQuest[msg.sender] = Quest(block.timestamp, false);
    return true;
  }

  function finishFishing() public returns (bool) {
    (uint256 startTime, bool finish) = getFishingQuest(msg.sender);
    require(!finish, 'This quest is finish');
    require(block.timestamp >= startTime.add(fishingDuration), 'Wait more');
    item.mint(msg.sender, 1);
    openianFishingQuest[msg.sender] = Quest(0, true);
    return true;
  }

  function startMining(uint256 _idHammer1) public returns (bool) {
    require(item.ownerOf(_idHammer1) == msg.sender, 'Not own hammer');
    require(item.get(_idHammer1) == 3, 'Not hammer');
    item.burn(_idHammer1);
    (uint256 startTime, ) = getMiningQuest(msg.sender);
    require(startTime == 0, 'Not finish last quest');
    uint256 oldStamina = profiles.getStamina(msg.sender);
    require(oldStamina >= miningStaminaRequire, 'Not enough stamina');
    openianMiningQuest[msg.sender] = Quest(block.timestamp, false);
    return true;
  }

  function finishMining() public returns (bool) {
    (uint256 startTime, bool finish) = getMiningQuest(msg.sender);
    require(!finish, 'This quest is finish');
    require(block.timestamp >= startTime.add(fishingDuration), 'Wait more');
    item.mint(msg.sender, 2);
    openianMiningQuest[msg.sender] = Quest(0, true);
    return true;
  }

  function makeSushi(uint256 idBurn) public {
    require(item.ownerOf(idBurn) == msg.sender, 'Not owner of token');
    require(item.get(idBurn) == 1, 'Not fish');
    item.mint(msg.sender, 4);
    item.setTrait(idBurn, 4);
  }

  function makeMultiSushi(uint256[] calldata _ids) public {
    require(_ids.length > 1, 'Invalid');
    for (uint256 index = 0; index < _ids.length; index++) {
      makeSushi(_ids[index]);
    }
  }

  function makeHammer(uint256 idBurn) public {
    require(item.ownerOf(idBurn) == msg.sender, 'Not owner of token');
    require(item.get(idBurn) == 2, 'Not fish');
    item.mint(msg.sender, 3);
    item.setTrait(idBurn, 3);
  }

  function makeMultiHammer(uint256[] calldata _ids) public {
    require(_ids.length > 1, 'Invalid');
    for (uint256 index = 0; index < _ids.length; index++) {
      makeHammer(_ids[index]);
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

  function refillStamina(address _account, uint256[] calldata _sushiIds)
    public
  {
    require(_sushiIds.length > 0, 'No sushi use');
    uint256 staminaRefill = 0;
    for (uint256 index = 0; index < _sushiIds.length; index++) {
      require(
        item.ownerOf(_sushiIds[index]) == msg.sender &&
          item.get(_sushiIds[index]) == 4,
        'Invalid sushi'
      );
      item.burn(_sushiIds[index]);
      staminaRefill += 50;
    }
    uint256 currentStamina = profiles.getStamina(_account);
    uint256 secondPerStamina = 857;
    uint256 timestamp = 0;
    if (currentStamina == 0) {
      timestamp = block.timestamp.sub(secondPerStamina.mul(staminaRefill));
    } else {
      timestamp = profiles.getStaminaTimestamp(_account).add(
        secondPerStamina.mul(staminaRefill)
      );
    }
    profiles.setStaminaTimestamp(_account, timestamp);
  }

  function setProfiles(address _profile) public {
    require(hasRole(MODERATOR_ROLE, msg.sender), 'Not moderator');
    profiles = Profiles(_profile);
  }
}
