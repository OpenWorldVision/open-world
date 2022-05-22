pragma solidity 0.7.5;
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Item is Initializable, ERC721Upgradeable, AccessControlUpgradeable {
  struct OWItem {
    uint8 trait; // 1: Fish, 2: Ore, 3: Hammer, 4: Sushi
  }

  bytes32 public constant PROFESSION_OPERATOR =
    keccak256('PROFESSION_OPERATOR');

  IERC20 public govToken;

  OWItem[] private tokens;

  function initialize(address _token) public initializer {
    __ERC721_init('OpenWorld Hero', 'OWH');
    __AccessControl_init();
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

    govToken = IERC20(_token);
  }

  event NewItem(uint256 indexed itemId, address indexed minter);

  function mint(address minter, uint8 _type) public {
    require(
      hasRole(PROFESSION_OPERATOR, msg.sender),
      'Not profession operator'
    );
    uint256 tokenId = tokens.length;
    tokens.push(OWItem(_type));
    _mint(minter, tokenId);
    emit NewItem(tokenId, minter);
  }

  function get(uint256 id) public view returns (uint8) {
    return tokens[id].trait;
  }
}
