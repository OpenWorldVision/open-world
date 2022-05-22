pragma solidity 0.7.5;
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract HeroCore is
  Initializable,
  ERC721Upgradeable,
  AccessControlUpgradeable
{
  using SafeMath for uint256;
  struct Hero {
    uint16 xp; // xp to next level
    uint8 level; // up to 256 cap
    uint8 trait; // 1: OPENER, 2: SUPPLIER, 3: BLACKSMITH
  }

  bytes32 public constant WORLD_OPERATOR = keccak256('WORLD_OPERATOR');

  address public ceoAddress;
  IERC20 public govToken;
  mapping(uint256 => address) private indexToOwner;
  uint256 public openianAmount;
  uint256 public supplierAmount;
  uint256 public blacksmithAmount;

  Hero[] private tokens;

  uint256 public openianPrice;
  uint256 public supplierPrice;
  uint256 public blacksmithPrice;

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
    require(trait > 0 && trait < 4, 'Wrong trait');
    uint256 purchasedToken;
    if (trait == 1) {
      require(openianAmount > 0, 'No more openian');
      openianAmount = openianAmount.sub(1);
      purchasedToken = openianPrice;
    }
    if (trait == 2) {
      require(supplierAmount > 0, 'No more supplier');
      supplierAmount = supplierAmount.sub(1);
      purchasedToken = supplierPrice;
    }
    if (trait == 3) {
      require(blacksmithAmount > 0, 'No more blacksmith');
      blacksmithAmount = blacksmithAmount.sub(1);
      purchasedToken = blacksmithPrice;
    }

    require(
      govToken.balanceOf(msg.sender) >= purchasedToken,
      'Not enough token'
    );
    govToken.transferFrom(msg.sender, address(this), purchasedToken);

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

  function setTraitAmount(uint8 trait, uint256 amount) public restricted {
    if (trait == 1) {
      openianAmount = amount;
    }
    if (trait == 2) {
      supplierAmount = amount;
    }
    if (trait == 3) {
      blacksmithAmount = amount;
    }
  }

  function setHeroPrice(uint8 trait, uint256 price) public restricted {
    if (trait == 1) {
      openianPrice = price;
    }
    if (trait == 2) {
      supplierPrice = price;
    }
    if (trait == 3) {
      blacksmithPrice = price;
    }
  }
}
