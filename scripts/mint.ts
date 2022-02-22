import { task } from "hardhat/config";
import { getContract } from "../helpers/helpers";
import fetch from "node-fetch";
import { parseEther } from "ethers/lib/utils";

task("mint", "Mints from the NFT contract").setAction(async function (
  taskArguments,
  hre
) {
  const contract = await getContract("Merge", hre);
  const transactionResponse = await contract.mint(
    [100000001, 100000001, 100000001, 100000001, 100000002, 100000003],
    {
      gasLimit: 500_000,
      gasPrice: 5_000_000_000,
    }
  );
  console.log(`Transaction Hash: ${transactionResponse.hash}`);
});

task("merge", "Merge 2 NFT")
  .addParam("tokenIdRcvr", "Token ID receiver")
  .addParam("tokenIdSndr", "Token ID sender")
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract("Merge", hre);
    const transactionResponse = await contract.merge(
      taskArguments.tokenIdRcvr,
      taskArguments.tokenIdSndr,
      {
        gasLimit: 500_000,
        gasPrice: 5_000_000_000,
      }
    );
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  });
