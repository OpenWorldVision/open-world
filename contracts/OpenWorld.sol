pragma solidity 0.7.5;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol';

contract OpenWorld is ERC20Pausable, Ownable {
  using SafeMath for uint256;

  uint256 private constant DECIMALS = 18;
  uint256 private constant INITIAL_SUPPLY = 100 * 10**6 * 10**DECIMALS;

  mapping(address => bool) private tokenBlacklist;
  mapping(address => bool) private _sellAddresses;
  mapping(address => bool) private _exceptionAddresses;
  mapping(address => uint256) private _nextClaimTime;

  bool public canClaim;
  uint256 public sellFeeRate;
  address public feeAddress;
  uint256 public rewardCycleBlock;
  uint256 public threshHoldTopUpRate;
  address public stakerAddress;
  bool public airdropEnabled;

  mapping(address => bool) private blacklistContractTransfer;

  event Blacklist(address indexed blackListed, bool value);
  event Mint(address indexed from, address indexed to, uint256 value);
  event Burn(address indexed burner, uint256 value);
  event UpdateSellFeeRate(uint256 sellFeeRate);
  event AddSellAddress(address sellAddress);
  event RemoveSellAddress(address sellAddress);
  event UpdateExceptionAddress(address exceptionAddress);
  event UpdateNextClaimTime(address account, uint256 timestamp);

  modifier canClaimReward() {
    require(canClaim, 'Cannot claim when canClaim is paused');
    _;
  }

  modifier onlyStaker() {
    require(msg.sender == stakerAddress, 'Only staker address');
    _;
  }

  constructor(
    string memory _name,
    string memory _symbol,
    address owner_
  ) public ERC20(_name, _symbol) {
    feeAddress = owner_;
    sellFeeRate = 8;
    canClaim = false;
    rewardCycleBlock = 7 days;
    threshHoldTopUpRate = 2;
    _mint(address(this), INITIAL_SUPPLY);
    _approve(address(this), msg.sender, totalSupply());
  }

  function transfer(address _to, uint256 _value)
    public
    override
    whenNotPaused
    returns (bool)
  {
    require(
      tokenBlacklist[msg.sender] == false,
      'Blacklist address cannot transfer'
    );

    require(
      isContractTransferBlock(msg.sender, _to) == false,
      'This address cannot send to ContractBlacklist Address'
    );
    require(
      isContractTransferBlock(_to, msg.sender) == false,
      'This address cannot receive from ContractBlacklist Address'
    );

    (uint256 fee, uint256 amount) = getValuesWithSellRate(
      _value,
      msg.sender,
      _to
    );

    // topUpClaimCycleAfterTransfer(_to, amount);
    if (fee > 0) {
      super.transfer(feeAddress, fee);
    }

    // airdrop();

    return super.transfer(_to, amount);
  }

  function totalSupply() public view override returns (uint256) {
    return super.totalSupply();
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  ) public override whenNotPaused returns (bool) {
    require(
      tokenBlacklist[_from] == false,
      'Blacklist address cannot transfer'
    );

    require(
      tokenBlacklist[msg.sender] == false,
      'Blacklist address cannot transfer'
    );

    require(
      isContractTransferBlock(_from, _to) == false,
      'This address cannot send to ContractBlacklist Address'
    );
    require(
      isContractTransferBlock(_to, _from) == false,
      'This address cannot receive from ContractBlacklist Address'
    );

    (uint256 fee, uint256 amount) = getValuesWithSellRate(_value, _from, _to);

    // topUpClaimCycleAfterTransfer(_to, amount);

    if (fee > 0) {
      super.transferFrom(_from, feeAddress, fee);
    }

    //  airdrop();

    return super.transferFrom(_from, _to, amount);
  }

  function approve(address _spender, uint256 _value)
    public
    override
    whenNotPaused
    returns (bool)
  {
    return super.approve(_spender, _value);
  }

  function increaseAllowance(address _spender, uint256 _addedValue)
    public
    override
    whenNotPaused
    returns (bool success)
  {
    return super.increaseAllowance(_spender, _addedValue);
  }

  function decreaseAllowance(address _spender, uint256 _subtractedValue)
    public
    override
    whenNotPaused
    returns (bool success)
  {
    return super.decreaseAllowance(_spender, _subtractedValue);
  }

  function burn(uint256 _value) public {
    _burn(msg.sender, _value);
  }

  function mint(address account, uint256 amount)
    public
    onlyOwner
    whenNotPaused
  {
    _mint(account, amount);
    emit Mint(address(0), account, amount);
  }

  function blackListAddress(address _address, bool _isBlackListed)
    public
    onlyOwner
    whenNotPaused
    returns (bool)
  {
    require(tokenBlacklist[_address] != _isBlackListed);
    tokenBlacklist[_address] = _isBlackListed;
    emit Blacklist(_address, _isBlackListed);
    return true;
  }

  function blackListContractTransfer(address _address, bool _isBlackListed)
    public
    onlyOwner
    whenNotPaused
    returns (bool)
  {
    require(blacklistContractTransfer[_address] != _isBlackListed);
    blacklistContractTransfer[_address] = _isBlackListed;
    // emit BlacklistContractTransfer(_address, _isBlackListed);
    return true;
  }

  function isContract(address _addr) public view returns (bool) {
    uint32 size;
    assembly {
      size := extcodesize(_addr)
    }
    return (size > 0);
  }

  function isContractTransferBlock(address _address, address contractAddress)
    public
    view
    returns (bool)
  {
    if (blacklistContractTransfer[_address]) {
      if (isContract(contractAddress)) {
        return true;
      }
    }

    return false;
  }

  function addSellAddress(address _sellAddress) public onlyOwner {
    _sellAddresses[_sellAddress] = true;
    emit AddSellAddress(_sellAddress);
  }

  function removeSellAddress(address _sellAddress) public onlyOwner {
    _sellAddresses[_sellAddress] = false;
    emit RemoveSellAddress(_sellAddress);
  }

  function setSellFeeRate(uint256 _sellFeeRate) public onlyOwner {
    sellFeeRate = _sellFeeRate;
    emit UpdateSellFeeRate(_sellFeeRate);
  }

  // function setThreshHoldTopUpRate(uint256 rate) public onlyOwner {
  //     threshHoldTopUpRate = rate;
  // }

  function setExceptionAddress(address _address) public onlyOwner {
    _exceptionAddresses[_address] = true;
    emit UpdateExceptionAddress(_address);
  }

  function removeExceptionAddress(address _address) public onlyOwner {
    _exceptionAddresses[_address] = false;
    emit UpdateExceptionAddress(_address);
  }

  function isSellAddress(address _address) public view returns (bool) {
    return _sellAddresses[_address];
  }

  function isExceptionAddress(address account) public view returns (bool) {
    return _exceptionAddresses[account];
  }

  function setStakerAddress(address account) public onlyOwner {
    stakerAddress = account;
  }

  // function setAirdropEnabled(bool _enabled) public onlyOwner {
  //     airdropEnabled = _enabled;
  // }

  function getValuesWithSellRate(
    uint256 amount,
    address from,
    address to
  ) private view returns (uint256, uint256) {
    uint256 fee = 0;
    uint256 transferAmount = amount;
    if (isSellAddress(to) && !isExceptionAddress(from)) {
      fee = amount.mul(sellFeeRate).div(10**3);
      transferAmount = amount.sub(fee);
    }
    return (fee, transferAmount);
  }

  function withdrawErc20(address tokenAddress) public onlyOwner {
    ERC20 _tokenInstance = ERC20(tokenAddress);
    _tokenInstance.transfer(
      msg.sender,
      _tokenInstance.balanceOf(address(this))
    );
  }
}
