import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("deploy", "Deploys the HerbTrace contract")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const { ethers } = hre;

    const HerbTraceFactory = await ethers.getContractFactory("HerbTrace");

    console.log("Deploying HerbTrace...");
    const herbTrace = await HerbTraceFactory.deploy();

    // This is the correct function for your Hardhat version
    await herbTrace.deployed();

    // This is the correct way to get the address
    console.log(`HerbTrace contract deployed to: ${herbTrace.address}`);
  });