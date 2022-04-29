pragma solidity 0.7.5;
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract HeroCore is
  Initializable,
  ERC721Upgradeable,
  AccessControlUpgradeable
{
  struct Hero {
    uint16 xp; // xp to next level
    uint8 level; // up to 256 cap
    uint8 trait; // 1: OPENER, 2: SUPPLIER, 3: BLACKSMITH
  }

  bytes32 public constant WORLD_OPERATOR = keccak256('WORLD_OPERATOR');

  address public ceoAddress;
  IERC20 public govToken;
  mapping(uint256 => address) private indexToOwner;

  Hero[] private tokens;

  function initialize(address _token) public initializer {
    __ERC721_init('OpenWorld Hero', 'OWH');
    __AccessControl_init();
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

    ceoAddress = msg.sender;
    govToken = IERC20(_token);
  }

  event NewHero(uint256 indexed character, address indexed minter);

  modifier restricted() {
    _restricted();
    _;
  }

  function _restricted() internal view {
    require(hasRole(WORLD_OPERATOR, msg.sender), 'Not operator');
  }

  modifier onlyNonContract() {
    _onlyNonContract();
    _;
  }

  function _onlyNonContract() internal view {
    require(!_isContract(msg.sender), 'contract not allowed');
    require(msg.sender == tx.origin, 'proxy contract not allowed');
  }

  function _isContract(address addr) internal view returns (bool) {
    uint256 size;
    assembly {
      size := extcodesize(addr)
    }
    return size > 0;
  }

  function heroIndexToOwner(uint256 _heroId) public view returns (address) {
    return indexToOwner[_heroId];
  }

  function mint(address minter, uint8 trait) public {
    uint256 tokenId = tokens.length;
    uint16 xp = 0;
    uint8 level = 0; // 1
    tokens.push(Hero(xp, level, trait));
    _mint(minter, tokenId);
    emit NewHero(tokenId, minter);
  }

  function getTrait(uint256 id) public view returns (uint8) {
    return tokens[id].trait;
  }
}
