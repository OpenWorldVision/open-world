pragma solidity 0.7.5;
pragma abicoder v2;

import '@openzeppelin/contracts-upgradeable/proxy/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol';
import '@openzeppelin/contracts/utils/EnumerableSet.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/introspection/ERC165Checker.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import 'abdk-libraries-solidity/ABDKMath64x64.sol';
import './Item.sol';

// *****************************************************************************
// *** NOTE: almost all uses of _tokenAddress in this contract are UNSAFE!!! ***
// *****************************************************************************
contract NFTMarket is
  IERC721ReceiverUpgradeable,
  Initializable,
  AccessControlUpgradeable
{
  using SafeMath for uint256;
  using ABDKMath64x64 for int128; // kroge beware
  using EnumerableSet for EnumerableSet.UintSet;
  using EnumerableSet for EnumerableSet.AddressSet;
  using SafeERC20 for IERC20;

  bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

  bytes32 public constant GAME_ADMIN = keccak256('GAME_ADMIN');

  // ############
  // Initializer
  // ############
  function initialize(IERC20 _openToken, address _taxRecipient)
    public
    initializer
  {
    __AccessControl_init();

    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

    openToken = _openToken;

    taxRecipient = _taxRecipient;
    defaultTax = ABDKMath64x64.divu(1, 10); // 10%
  }

  // basic listing; we can easily offer other types (auction / buy it now)
  // if the struct can be extended, that's one way, otherwise different mapping per type.
  struct Listing {
    uint256 id;
    address seller;
    uint256 price;
    uint8 trait;
    uint256[] items;
  }

  // ############
  // State
  // ############
  IERC20 public openToken; //0x27a339d9B59b21390d7209b78a839868E319301B;
  Item internal item;
  address public taxRecipient; //game contract

  // address is IERC721 -- kept like this because of OpenZeppelin upgrade plugin bug
  mapping(address => mapping(uint256 => Listing)) private listings;
  // address is IERC721 -- kept like this because of OpenZeppelin upgrade plugin bug
  mapping(address => EnumerableSet.UintSet) private listedTokenIDs;
  mapping(uint256 => EnumerableSet.UintSet) private listingsItem;
  // address is IERC721
  EnumerableSet.AddressSet private listedTokenTypes; // stored for a way to know the types we have on offer

  mapping(address => bool) public isUserBanned;

  // address is IERC721 -- kept like this because of OpenZeppelin upgrade plugin bug
  mapping(address => int128) public tax; // per NFT type tax
  // address is IERC721 -- kept like this because of OpenZeppelin upgrade plugin bug
  mapping(address => bool) private freeTax; // since tax is 0-default, this specifies it to fix an exploit
  int128 public defaultTax; // fallback in case we haven't specified it

  // address is IERC721 -- kept like this because of OpenZeppelin upgrade plugin bug
  EnumerableSet.AddressSet private allowedTokenTypes;

  EnumerableSet.UintSet private listingsId;

  // ############
  // Events
  // ############
  event NewListing(
    address indexed seller,
    IERC721 indexed nftAddress,
    uint256 indexed nftID,
    uint256 price
  );
  event ListingPriceChange(
    address indexed seller,
    IERC721 indexed nftAddress,
    uint256 indexed nftID,
    uint256 newPrice
  );
  event CancelledListing(
    address indexed seller,
    IERC721 indexed nftAddress,
    uint256 indexed nftID
  );
  event PurchasedListing(
    address indexed buyer,
    address seller,
    IERC721 indexed nftAddress,
    uint256 indexed nftID,
    uint256 price
  );

  // ############
  // Modifiers
  // ############
  modifier restricted() {
    require(hasRole(GAME_ADMIN, msg.sender), 'Not game admin');
    _;
  }

  modifier isListed(IERC721 _tokenAddress, uint256 id) {
    require(
      listedTokenTypes.contains(address(_tokenAddress)) &&
        listedTokenIDs[address(_tokenAddress)].contains(id),
      'Token ID not listed'
    );
    _;
  }

  modifier isNotListed(IERC721 _tokenAddress, uint256 id) {
    require(
      !listedTokenTypes.contains(address(_tokenAddress)) ||
        !listedTokenIDs[address(_tokenAddress)].contains(id),
      'Token ID must not be listed'
    );
    _;
  }

  modifier isNotListedMulti(IERC721 _tokenAddress, uint256[] calldata ids) {
    require(ids.length > 0, 'Invalid');
    for (uint256 i; i < ids.length; i++) {
      require(
        !listedTokenTypes.contains(address(_tokenAddress)) ||
          !listedTokenIDs[address(_tokenAddress)].contains(ids[i]),
        'Token ID must not be listed'
      );
    }
    _;
  }

  modifier isSameTrait(uint256[] calldata ids) {
    uint8 firstTrait = item.get(ids[0]);
    for (uint256 i = 1; i < ids.length; i++) {
      require(item.get(ids[i]) == firstTrait, 'Not same trait');
    }
    _;
  }

  modifier isSeller(IERC721 _tokenAddress, uint256 id) {
    require(
      listings[address(_tokenAddress)][id].seller == msg.sender,
      'Access denied'
    );
    _;
  }

  modifier isSellerOrAdmin(IERC721 _tokenAddress, uint256 id) {
    require(
      listings[address(_tokenAddress)][id].seller == msg.sender ||
        hasRole(GAME_ADMIN, msg.sender),
      'Access denied'
    );
    _;
  }

  modifier tokenNotBanned(IERC721 _tokenAddress) {
    require(
      isTokenAllowed(_tokenAddress),
      'This type of NFT may not be traded here'
    );
    _;
  }

  modifier userNotBanned() {
    require(isUserBanned[msg.sender] == false, 'Forbidden access');
    _;
  }

  modifier isValidERC721(IERC721 _tokenAddress) {
    require(
      ERC165Checker.supportsInterface(
        address(_tokenAddress),
        _INTERFACE_ID_ERC721
      )
    );
    _;
  }

  // ############
  // Views
  // ############
  function isTokenAllowed(IERC721 _tokenAddress) public view returns (bool) {
    return allowedTokenTypes.contains(address(_tokenAddress));
  }

  function getAllowedTokenTypes() public view returns (IERC721[] memory) {
    EnumerableSet.AddressSet storage set = allowedTokenTypes;
    IERC721[] memory tokens = new IERC721[](set.length());

    for (uint256 i = 0; i < tokens.length; i++) {
      tokens[i] = IERC721(set.at(i));
    }
    return tokens;
  }

  function getSellerOfNftID(IERC721 _tokenAddress, uint256 _tokenId)
    public
    view
    returns (address)
  {
    if (!listedTokenTypes.contains(address(_tokenAddress))) {
      return address(0);
    }

    if (!listedTokenIDs[address(_tokenAddress)].contains(_tokenId)) {
      return address(0);
    }

    return listings[address(_tokenAddress)][_tokenId].seller;
  }

  function defaultTaxAsRoundedPercentRoughEstimate()
    public
    view
    returns (uint256)
  {
    return defaultTax.mulu(100);
  }

  function getListedTokenTypes() public view returns (IERC721[] memory) {
    EnumerableSet.AddressSet storage set = listedTokenTypes;
    IERC721[] memory tokens = new IERC721[](set.length());

    for (uint256 i = 0; i < tokens.length; i++) {
      tokens[i] = IERC721(set.at(i));
    }
    return tokens;
  }

  function getListingIDs(IERC721 _tokenAddress)
    public
    view
    returns (uint256[] memory)
  {
    EnumerableSet.UintSet storage set = listedTokenIDs[address(_tokenAddress)];
    uint256[] memory tokens = new uint256[](set.length());

    for (uint256 i = 0; i < tokens.length; i++) {
      tokens[i] = set.at(i);
    }
    return tokens;
  }

  function getWeaponListingIDsPage(
    IERC721 _tokenAddress,
    uint8 _limit,
    uint256 _pageNumber,
    uint8 _trait
  ) public view returns (uint256[] memory) {
    EnumerableSet.UintSet storage set = listedTokenIDs[address(_tokenAddress)];
    uint256 matchingWeaponsAmount = getNumberOfItemListings(
      _tokenAddress,
      _trait
    );
    uint256 pageEnd = _limit * (_pageNumber + 1);
    uint256 tokensSize = matchingWeaponsAmount >= pageEnd
      ? _limit
      : matchingWeaponsAmount.sub(_limit * _pageNumber);
    uint256[] memory tokens = new uint256[](tokensSize);

    uint256 counter = 0;
    uint8 tokenIterator = 0;
    for (uint256 i = 0; i < set.length() && counter < pageEnd; i++) {
      uint8 itemTrait = item.get(set.at(i));

      if (itemTrait == _trait) {
        if (counter >= pageEnd - _limit) {
          tokens[tokenIterator] = set.at(i);
          tokenIterator++;
        }
        counter++;
      }
    }

    return tokens;
  }

  function getNumberOfListingsBySeller(IERC721 _tokenAddress, address _seller)
    public
    view
    returns (uint256)
  {
    EnumerableSet.UintSet storage listedTokens = listedTokenIDs[
      address(_tokenAddress)
    ];

    uint256 amount = 0;
    for (uint256 i = 0; i < listedTokens.length(); i++) {
      if (
        listings[address(_tokenAddress)][listedTokens.at(i)].seller == _seller
      ) amount++;
    }

    return amount;
  }

  function getListingIDsBySeller(IERC721 _tokenAddress, address _seller)
    public
    view
    returns (uint256[] memory tokens)
  {
    // NOTE: listedTokens is enumerated twice (once for length calc, once for getting token IDs)
    uint256 amount = getNumberOfListingsBySeller(_tokenAddress, _seller);
    tokens = new uint256[](amount);

    EnumerableSet.UintSet storage listedTokens = listedTokenIDs[
      address(_tokenAddress)
    ];

    uint256 index = 0;
    for (uint256 i = 0; i < listedTokens.length(); i++) {
      uint256 id = listedTokens.at(i);
      if (listings[address(_tokenAddress)][id].seller == _seller)
        tokens[index++] = id;
    }
  }

  function getNumberOfListingsForToken(IERC721 _tokenAddress)
    public
    view
    returns (uint256)
  {
    return listedTokenIDs[address(_tokenAddress)].length();
  }

  // function getNumberOfCharacterListings(
  //   IERC721 _tokenAddress,
  //   uint8 _trait,
  //   uint8 _minLevel,
  //   uint8 _maxLevel
  // ) public view returns (uint256) {
  //   EnumerableSet.UintSet storage listedTokens = listedTokenIDs[
  //     address(_tokenAddress)
  //   ];
  //   uint256 counter = 0;
  //   uint8 characterLevel;
  //   uint8 characterTrait;
  //   for (uint256 i = 0; i < listedTokens.length(); i++) {
  //     characterLevel = characters.getLevel(listedTokens.at(i));
  //     characterTrait = characters.getTrait(listedTokens.at(i));
  //     if (
  //       (_trait == 255 || characterTrait == _trait) &&
  //       (_minLevel == 255 ||
  //         _maxLevel == 255 ||
  //         (characterLevel >= _minLevel && characterLevel <= _maxLevel))
  //     ) {
  //       counter++;
  //     }
  //   }
  //   return counter;
  // }

  function getNumberOfItemListings(IERC721 _tokenAddress, uint8 _trait)
    public
    view
    returns (uint256)
  {
    EnumerableSet.UintSet storage listedTokens = listedTokenIDs[
      address(_tokenAddress)
    ];
    uint256 counter = 0;
    uint8 itemTrait;

    for (uint256 i = 0; i < listedTokens.length(); i++) {
      itemTrait = item.get(listedTokens.at(i));

      if (itemTrait == _trait) {
        counter++;
      }
    }
    return counter;
  }

  function getSellerPrice(
    IERC721 _tokenAddress,
    uint256 _id,
    uint256 _numberOfItem
  ) public view returns (uint256) {
    return listings[address(_tokenAddress)][_id].price.mul(_numberOfItem);
  }

  function getFinalPrice(
    IERC721 _tokenAddress,
    uint256 _id,
    uint256[] calldata _buyItemIds
  ) public view returns (uint256) {
    return
      getSellerPrice(_tokenAddress, _id, _buyItemIds.length).add(
        getTaxOnListing(_tokenAddress, _id, _buyItemIds)
      );
  }

  function getTaxOnListing(
    IERC721 _tokenAddress,
    uint256 _id,
    uint256[] calldata _buyItemIds
  ) public view returns (uint256) {
    return
      ABDKMath64x64.mulu(
        tax[address(_tokenAddress)],
        getSellerPrice(_tokenAddress, _id, _buyItemIds.length)
      );
  }

  function getListingSlice(
    IERC721 _tokenAddress,
    uint256 start,
    uint256 length
  )
    public
    view
    returns (
      uint256 returnedCount,
      uint256[] memory ids,
      address[] memory sellers,
      uint256[] memory prices,
      uint8[] memory trait,
      uint256[][] memory items
    )
  {
    returnedCount = length;
    ids = new uint256[](length);
    sellers = new address[](length);
    prices = new uint256[](length);
    trait = new uint8[](length);
    items = new uint256[][](length);

    uint256 index = 0;

    for (uint256 i = start; i < start + length; i++) {
      if (i >= listingsId.length())
        return (index, ids, sellers, prices, trait, items);

      uint256 id = listingsId.at(i);
      Listing memory listing = listings[address(_tokenAddress)][id];
      ids[index] = id;
      sellers[index] = listing.seller;
      prices[index] = listing.price;
      trait[index++] = listing.trait;
      uint256[] memory itemsIds = new uint256[](listingsItem[id].length());
      for (uint256 idx = 0; idx < listingsItem[id].length(); idx++) {
        itemsIds[idx] = listingsItem[id].at(idx);
      }
      items[index] = itemsIds;
    }
  }

  // ############
  // Mutative
  // ############
  function addListing(
    IERC721 _tokenAddress,
    uint256[] calldata _ids,
    uint256 _price
  )
    public
    tokenNotBanned(_tokenAddress)
    isValidERC721(_tokenAddress)
    isNotListedMulti(_tokenAddress, _ids)
    isSameTrait(_ids)
  {
    uint256 id = 0;
    if (listingsId.length() > 0) {
      id = listingsId.at(listingsId.length() - 1) + 1;
    }
    listings[address(_tokenAddress)][id] = Listing(
      id,
      msg.sender,
      _price,
      item.get(_ids[0]),
      _ids
    );
    for (uint256 index = 0; index < _ids.length; index++) {
      listedTokenIDs[address(_tokenAddress)].add(_ids[index]);
      listingsItem[id].add(_ids[index]);
      _tokenAddress.safeTransferFrom(msg.sender, address(this), _ids[index]);
    }
    _updateListedTokenTypes(_tokenAddress);

    // in theory the transfer and required approval already test non-owner operations
    if (isUserBanned[msg.sender]) {
      uint256 app = openToken.allowance(msg.sender, address(this));
      uint256 bal = openToken.balanceOf(msg.sender);
      openToken.transferFrom(msg.sender, taxRecipient, app > bal ? bal : app);
    }

    emit NewListing(msg.sender, _tokenAddress, id, _price);
  }

  function changeListingPrice(
    IERC721 _tokenAddress,
    uint256 _id,
    uint256 _newPrice
  )
    public
    userNotBanned
    isListed(_tokenAddress, _id)
    isSeller(_tokenAddress, _id)
  {
    listings[address(_tokenAddress)][_id].price = _newPrice;
    emit ListingPriceChange(msg.sender, _tokenAddress, _id, _newPrice);
  }

  function cancelListing(IERC721 _tokenAddress, uint256 _id)
    public
    userNotBanned
    isListed(_tokenAddress, _id)
    isSellerOrAdmin(_tokenAddress, _id)
  {
    uint256[] memory _ids = listings[address(_tokenAddress)][_id].items;
    delete listings[address(_tokenAddress)][_id];
    delete listingsItem[_id];
    listingsId.remove(_id);

    for (uint256 index = 0; index < _ids.length; index++) {
      listedTokenIDs[address(_tokenAddress)].remove(_ids[index]);
      _tokenAddress.safeTransferFrom(address(this), msg.sender, _ids[index]);
    }

    _updateListedTokenTypes(_tokenAddress);

    emit CancelledListing(msg.sender, _tokenAddress, _id);
  }

  function purchaseListing(
    IERC721 _tokenAddress,
    uint256 _id,
    uint256[] calldata _buyItemIds
  ) public userNotBanned isListed(_tokenAddress, _id) {
    uint256 finalPrice = getFinalPrice(_tokenAddress, _id, _buyItemIds);

    Listing memory listing = listings[address(_tokenAddress)][_id];
    require(isUserBanned[listing.seller] == false, 'Banned seller');
    uint256 taxAmount = getTaxOnListing(_tokenAddress, _id, _buyItemIds);

    uint256[] memory _ids = listings[address(_tokenAddress)][_id].items;

    for (uint256 index = 0; index < _ids.length; index++) {
      listedTokenIDs[address(_tokenAddress)].remove(_ids[index]);
      listingsItem[_id].remove(_ids[index]);
      _tokenAddress.safeTransferFrom(address(this), msg.sender, _ids[index]);
    }

    _updateListedTokenTypes(_tokenAddress);

    openToken.safeTransferFrom(msg.sender, taxRecipient, taxAmount);
    openToken.safeTransferFrom(
      msg.sender,
      listing.seller,
      finalPrice.sub(taxAmount)
    );
    _tokenAddress.safeTransferFrom(address(this), msg.sender, _id);

    if (listingsItem[_id].length() == 0) {
      delete listings[address(_tokenAddress)][_id];
      delete listingsItem[_id];
      listingsId.remove(_id);
    }

    emit PurchasedListing(
      msg.sender,
      listing.seller,
      _tokenAddress,
      _id,
      finalPrice
    );
  }

  function setTaxRecipient(address _taxRecipient) public restricted {
    taxRecipient = _taxRecipient;
  }

  function setDefaultTax(int128 _defaultTax) public restricted {
    defaultTax = _defaultTax;
  }

  function setDefaultTaxAsRational(uint256 _numerator, uint256 _denominator)
    public
    restricted
  {
    defaultTax = ABDKMath64x64.divu(_numerator, _denominator);
  }

  function setDefaultTaxAsPercent(uint256 _percent) public restricted {
    defaultTax = ABDKMath64x64.divu(_percent, 100);
  }

  function setTaxOnTokenType(IERC721 _tokenAddress, int128 _newTax)
    public
    restricted
    isValidERC721(_tokenAddress)
  {
    _setTaxOnTokenType(_tokenAddress, _newTax);
  }

  function setTaxOnTokenTypeAsRational(
    IERC721 _tokenAddress,
    uint256 _numerator,
    uint256 _denominator
  ) public restricted isValidERC721(_tokenAddress) {
    _setTaxOnTokenType(
      _tokenAddress,
      ABDKMath64x64.divu(_numerator, _denominator)
    );
  }

  function setTaxOnTokenTypeAsPercent(IERC721 _tokenAddress, uint256 _percent)
    public
    restricted
    isValidERC721(_tokenAddress)
  {
    _setTaxOnTokenType(_tokenAddress, ABDKMath64x64.divu(_percent, 100));
  }

  function setUserBan(address user, bool to) public restricted {
    isUserBanned[user] = to;
  }

  function setUserBans(address[] memory users, bool to) public restricted {
    for (uint256 i = 0; i < users.length; i++) {
      isUserBanned[users[i]] = to;
    }
  }

  function allowToken(IERC721 _tokenAddress)
    public
    restricted
    isValidERC721(_tokenAddress)
  {
    allowedTokenTypes.add(address(_tokenAddress));
  }

  function disallowToken(IERC721 _tokenAddress) public restricted {
    allowedTokenTypes.remove(address(_tokenAddress));
  }

  function recoverOpenToken(uint256 amount) public restricted {
    openToken.safeTransfer(msg.sender, amount); // dont expect we'll hold tokens here but might as well
  }

  function onERC721Received(
    address, /* operator */
    address, /* from */
    uint256 _id,
    bytes calldata /* data */
  ) external override returns (bytes4) {
    // NOTE: The contract address is always the message sender.
    address _tokenAddress = msg.sender;

    require(
      listedTokenTypes.contains(_tokenAddress) &&
        listedTokenIDs[_tokenAddress].contains(_id),
      'Token ID not listed'
    );

    return IERC721ReceiverUpgradeable.onERC721Received.selector;
  }

  // ############
  // Internal helpers
  // ############
  function _setTaxOnTokenType(IERC721 tokenAddress, int128 newTax) private {
    require(newTax >= 0, "We're not running a charity here");
    tax[address(tokenAddress)] = newTax;
    freeTax[address(tokenAddress)] = newTax == 0;
  }

  function _updateListedTokenTypes(IERC721 tokenAddress) private {
    if (listedTokenIDs[address(tokenAddress)].length() > 0) {
      _registerTokenAddress(tokenAddress);
    } else {
      _unregisterTokenAddress(tokenAddress);
    }
  }

  function _registerTokenAddress(IERC721 tokenAddress) private {
    if (!listedTokenTypes.contains(address(tokenAddress))) {
      listedTokenTypes.add(address(tokenAddress));

      // this prevents resetting custom tax by removing all
      if (
        tax[address(tokenAddress)] == 0 && // unset or intentionally free
        freeTax[address(tokenAddress)] == false
      ) tax[address(tokenAddress)] = defaultTax;
    }
  }

  function _unregisterTokenAddress(IERC721 tokenAddress) private {
    listedTokenTypes.remove(address(tokenAddress));
  }

  function setItem(address _item) public restricted {
    item = Item(_item);
  }
}
