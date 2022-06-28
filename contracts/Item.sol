pragma solidity 0.7.5;
pragma experimental ABIEncoderV2;
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
  mapping(address => bool) private boughtHammer;
  uint256 public hammerPrice;

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

  function burn(uint256 tokenId) public {
    _burn(tokenId);
  }

  function get(uint256 id) public view returns (uint8) {
    return tokens[id].trait;
  }

  function setTrait(uint256 _id, uint8 _trait) public {
    require(
      hasRole(PROFESSION_OPERATOR, msg.sender),
      'Not profession operator'
    );

    require(_trait >= 1 && _trait <= 4, 'Invalid trait');

    tokens[_id].trait = _trait;
  }

  function getAmountItemByTrait(uint8 _trait, address _account)
    public
    view
    returns (uint256[] memory)
  {
    uint256[] memory _ids = new uint256[](balanceOf(_account));
    uint256 idx;
    for (uint256 i; i < balanceOf(_account); i++) {
      uint256 _id = tokenOfOwnerByIndex(_account, i);
      uint8 trait = get(_id);
      if (trait == _trait) {
        _ids[idx] = _id;
        idx++;
      }
    }
    return _ids;
  }

  function buyFirstHammer() public {
    require(boughtHammer[msg.sender] == false, "You've bought hammer");
    require(
      govToken.balanceOf(msg.sender) >= hammerPrice,
      'No money no hammer'
    );

    boughtHammer[msg.sender] = true;
    uint256 tokenId = tokens.length;
    tokens.push(OWItem(3));
    _mint(msg.sender, tokenId);
    emit NewItem(tokenId, msg.sender);
  }
}
