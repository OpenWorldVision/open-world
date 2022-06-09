pragma solidity 0.7.5;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './HeroCore.sol';

contract Profiles is AccessControlUpgradeable {
  using SafeMath for uint256;
  uint256 public constant MAX_STAMINA = 100;

  mapping(address => uint256) public addressToIndex;
  mapping(string => uint256) public nameToIndex;
  address[] public addresses;

  HeroCore public heroesNftContract;

  uint8 minLength;
  uint8 maxLength;
  uint8 maxPic;
  uint256 public requireBalanceProfession;
  address public governanceToken;

  enum Profession {
    UNKNOWN,
    OPENER,
    SUPPLIER,
    BLACKSMITH
  }

  // The profile struct.
  struct Profile {
    // The id.
    uint256 id;
    // The address of the profile.
    address owner;
    // The name of the profile.
    string name;
    // When the profile was created.
    uint64 created;
    // The profile picture id.
    uint8 picId;
    // The profile picture hero id.
    uint256 heroId;
    // If this is a real profile or not.
    bool set;
    Profession profession;
    uint256 stamina;
  }

  mapping(uint256 => Profile) public profiles;

  mapping(uint256 => uint256) public points;

  bytes32 public constant MODERATOR_ROLE = keccak256('MODERATOR_ROLE');
  bytes32 public constant POINTS_ROLE = keccak256('POINTS_ROLE');
  bytes32 public constant PROFESSION_OPERATOR =
    keccak256('PROFESSION_OPERATOR');

  mapping(address => uint256) timestampStamina;

  event ProfileCreated(
    uint256 profileId,
    address owner,
    string name,
    uint64 created,
    uint8 picId
  );
  event ProfileUpdated(
    uint256 profileId,
    address owner,
    string name,
    uint64 created,
    uint8 picId,
    uint256 heroId
  );

  function initialize(address _govToken) public initializer {
    __AccessControl_init();

    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    grantRole(MODERATOR_ROLE, msg.sender);

    minLength = 3;
    maxLength = 16;
    maxPic = 15;
    governanceToken = _govToken;

    addresses.push(address(0));
    addressToIndex[address(0)] = 0;
    nameToIndex['self'] = 0;

    Profile memory profile = Profile(
      0,
      address(0),
      'self',
      uint64(block.timestamp),
      0,
      0,
      false,
      Profession.UNKNOWN,
      0
    );

    profiles[0] = profile;
  }

  /// @dev Checks if a profile exists for an address.
  function profileExists(address profileAddress)
    public
    view
    returns (bool exists)
  {
    Profile storage profile = profiles[addressToIndex[profileAddress]];
    return profile.set;
  }

  /// @dev Checks if a name is taken.
  function nameTaken(string memory name) public view returns (bool taken) {
    return (nameToIndex[name] > 0);
  }

  /// @dev Creates a Profile.
  function createProfile(string memory _name, uint8 _picId)
    public
    returns (bool success)
  {
    require(!profileExists(msg.sender), 'profile already exists');
    require(!nameTaken(_name), 'name already taken');
    // Enforce maximum length.
    require(bytes(_name).length >= minLength, 'name too short');
    require(bytes(_name).length <= maxLength, 'name too long');

    uint256 profileId = addresses.length;

    addresses.push(msg.sender);
    addressToIndex[msg.sender] = profileId;
    nameToIndex[_name] = profileId;

    Profile memory profile = Profile(
      profileId,
      msg.sender,
      _name,
      uint64(block.timestamp),
      _picId,
      0,
      true,
      Profession.UNKNOWN,
      MAX_STAMINA
    );

    profiles[profileId] = profile;

    emit ProfileCreated(
      profileId,
      profile.owner,
      profile.name,
      profile.created,
      profile.picId
    );

    return true;
  }

  function setProfession(Profession _profession, uint256 _heroId)
    public
    returns (bool success)
  {
    require(profileExists(msg.sender), 'profile must exist');
    Profile storage profile = profiles[addressToIndex[msg.sender]];
    require(profile.profession == Profession.UNKNOWN, 'Profession already set');
    require(
      IERC20(governanceToken).balanceOf(msg.sender) > requireBalanceProfession,
      'Not enough balance'
    );
    require(
      heroesNftContract.getTrait(_heroId) == uint8(_profession) &&
        heroesNftContract.ownerOf(_heroId) == msg.sender,
      'Invalid'
    );

    profile.profession = _profession;
    return true;
  }

  function setRequireBalanceProfession(uint256 _value) public returns (bool) {
    require(hasRole(MODERATOR_ROLE, msg.sender), 'access denied');
    requireBalanceProfession = _value;
    return true;
  }

  /// @dev Sets the heroes NFT contract.
  function setHeroes(address _address) public returns (bool success) {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'access denied');
    HeroCore candidateContract = HeroCore(_address);

    // Verify that it is an actual contract.
    require(candidateContract.ceoAddress() != address(0), 'invalid');

    // Set it.
    heroesNftContract = candidateContract;
    return true;
  }

  /// @dev Sets the min and max lengths for names.
  function setNameLengths(uint8 _min, uint8 _max)
    public
    returns (bool success)
  {
    require(hasRole(MODERATOR_ROLE, msg.sender), 'access denied');
    minLength = _min;
    maxLength = _max;
    return true;
  }

  /// @dev Sets the max pic id.
  function setPicMax(uint8 _max) public returns (bool success) {
    require(hasRole(MODERATOR_ROLE, msg.sender), 'access denied');
    maxPic = _max;
    return true;
  }

  /// @dev Changes the name for a profile.
  function changeName(uint256 profileId, string memory _name)
    public
    returns (bool success)
  {
    require(hasRole(MODERATOR_ROLE, msg.sender), 'access denied');
    require(!nameTaken(_name), 'name already taken');
    // Enforce length.
    require(bytes(_name).length >= minLength, 'name too short');
    require(bytes(_name).length <= maxLength, 'name too long');

    Profile storage profile = profiles[profileId];
    require(profile.set, 'invalid id');

    // Set the new name.
    nameToIndex[_name] = profileId;

    // Remove the old name.
    delete nameToIndex[profile.name];

    profile.name = _name;

    emit ProfileUpdated(
      profileId,
      profile.owner,
      profile.name,
      profile.created,
      profile.picId,
      profile.heroId
    );

    return true;
  }

  /// @dev Changes the pic for a profile.
  function changePic(uint256 profileId, uint8 _picId)
    public
    returns (bool success)
  {
    // Enforce bounds.
    require(_picId < maxPic, 'pic out of bounds');

    // Make sure it's a valid profile.
    Profile storage profile = profiles[profileId];
    require(profile.set, 'invalid id');

    // Make sure they own the profile.
    require(profile.owner == msg.sender, 'access denied');

    profile.picId = _picId;

    emit ProfileUpdated(
      profileId,
      profile.owner,
      profile.name,
      profile.created,
      profile.picId,
      profile.heroId
    );

    return true;
  }

  /// @dev Changes the hero pic for a profile.
  function changeHeroPic(uint256 profileId, uint256 _heroId)
    public
    returns (bool success)
  {
    // Make sure it's a valid profile.
    Profile storage profile = profiles[profileId];
    require(profile.set, 'invalid id');

    // Make sure they own the profile.
    require(profile.owner == msg.sender, 'access denied');

    // Make sure they own the hero.
    require(
      heroesNftContract.heroIndexToOwner(_heroId) == msg.sender,
      'invalid owner'
    );

    profile.heroId = _heroId;

    emit ProfileUpdated(
      profileId,
      profile.owner,
      profile.name,
      profile.created,
      profile.picId,
      profile.heroId
    );

    return true;
  }

  function setStamina(address profileAddress, uint256 newStamina) public {
    require(hasRole(PROFESSION_OPERATOR, msg.sender), 'Access denied');
    require(newStamina <= MAX_STAMINA, 'Wrong sta');
    Profile storage _profile = profiles[addressToIndex[profileAddress]];
    _profile.stamina = newStamina;
  }

  /// @dev Gets the total number of profiles.
  function getProfileCount() public view returns (uint256 count) {
    return addresses.length;
  }

  /// @dev Gets a profile by address.
  function getProfileByAddress(address profileAddress)
    public
    view
    returns (
      uint256 _id,
      address _owner,
      string memory _name,
      uint64 _created,
      uint8 _picId,
      uint256 _heroId,
      uint256 _points,
      Profession _profession,
      uint256 stamina
    )
  {
    require(profileExists(profileAddress), 'no profile found');
    Profile memory profile = profiles[addressToIndex[profileAddress]];
    return (
      profile.id,
      profile.owner,
      profile.name,
      profile.created,
      profile.picId,
      profile.heroId,
      points[profile.id],
      profile.profession,
      profile.stamina
    );
  }

  /// @dev Gets the Profile by name.
  function getProfileByName(string memory name)
    public
    view
    returns (
      uint256 _id,
      address _owner,
      string memory _name,
      uint64 _created,
      uint8 _picId,
      uint256 _heroId,
      uint256 _points,
      uint256 _stamina
    )
  {
    require(nameTaken(name), 'name not found');
    Profile memory profile = profiles[nameToIndex[name]];
    return (
      profile.id,
      profile.owner,
      profile.name,
      profile.created,
      profile.picId,
      profile.heroId,
      points[profile.id],
      profile.stamina
    );
  }

  /// @dev Gets the address of a name.
  function getAddressByName(string memory name)
    public
    view
    returns (address profileAddress)
  {
    require(nameTaken(name), 'name not found');
    return addresses[nameToIndex[name]];
  }

  function canSetProfession(address account) public view returns (bool) {
    Profile memory profile = profiles[addressToIndex[msg.sender]];

    return
      profileExists(account) &&
      profile.profession == Profession.UNKNOWN &&
      IERC20(governanceToken).balanceOf(msg.sender) > requireBalanceProfession;
  }

  /// @dev Adds points to a profile.
  function addPoints(address _address, uint256 _points)
    public
    returns (bool success)
  {
    require(hasRole(POINTS_ROLE, msg.sender), 'access denied');
    require(profileExists(_address), 'no profile found');
    Profile memory profile = profiles[addressToIndex[_address]];
    points[profile.id] += _points;
    return true;
  }

  function getStamina(address _account) public view returns (uint256 stamina) {
    uint256 timestamp = timestampStamina[_account];
    uint256 current = block.timestamp;

    if (timestamp == 0) {
      require(profileExists(_account), 'no profile found');
      Profile memory profile = profiles[addressToIndex[_account]];
      timestamp = profile.created;
    }
    if (current >= timestamp) {
      return 0;
    }
    uint256 currentStamina = timestamp.sub(current).div(857);
    if (currentStamina > MAX_STAMINA) {
      return MAX_STAMINA;
    }
    return currentStamina;
  }

  function getStaminaTimestamp(address _account)
    public
    view
    returns (uint256 _timestamp)
  {
    _timestamp = timestampStamina[_account];
    if (_timestamp == 0) {
      require(profileExists(_account), 'no profile found');
      Profile memory profile = profiles[addressToIndex[_account]];
      _timestamp = profile.created;
    }
  }

  function setStaminaTimestamp(address _account, uint256 _timestamp) public {
    require(hasRole(PROFESSION_OPERATOR, msg.sender), 'Access denied');
    if (_timestamp < block.timestamp) {
      _timestamp = block.timestamp;
    }
    timestampStamina[_account] = _timestamp;
  }
}
