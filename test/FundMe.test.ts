import { expect } from "chai";
import { ethers } from "hardhat";
import { FundMe } from "../typechain-types";

describe("FundMe", function () {
  let fundMe: FundMe;
  let owner: any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const FundMeFactory = await ethers.getContractFactory("FundMe");
    fundMe = (await FundMeFactory.deploy(
      "0x694AA1769357215DE4FAC081bf1f309aDC325306" // Replace with actual price feed address
    )) as FundMe;
    await fundMe.deployed();
  });

  it("should be deployed", async function () {
    expect(fundMe.address).to.properAddress;
  });

  it("should allow funding and update the balance", async function () {
    await fundMe.fund({ value: ethers.utils.parseEther(".01") });
    expect(await fundMe.getAddressToAmountFunded(owner.address)).to.equal(
      ethers.utils.parseEther("1")
    );
  });

  it("should allow the owner to withdraw funds", async function () {
    await fundMe.fund({ value: ethers.utils.parseEther("0.01") });
    await fundMe.withdraw();
    expect(await ethers.provider.getBalance(fundMe.address)).to.equal(0);
  });
});