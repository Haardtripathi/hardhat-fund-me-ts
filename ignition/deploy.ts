import { network, ethers } from "hardhat"



async function main() {
    const FundMeFactory = await ethers.getContractFactory("FundMe")
    const priceFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    const [deployer] = await ethers.getSigners();

    const FundMe = await FundMeFactory.deploy(priceFeedAddress)

    console.log("FundMe deployed to:", FundMe.address);

    // const owner = await FundMe.owner();
    // console.log("Contract owner:", owner);

    const transactionResponse = await FundMe.fund({
        value: ethers.utils.parseEther("0.01"),
    });
    await transactionResponse.wait();
    console.log("Funded the contract with 0.01 ETH");


    const amountFunded = await FundMe.getAddressToAmountFunded(deployer.address);
    console.log(
        "Amount funded by deployer:",
        ethers.utils.formatEther(amountFunded.toString()),
        "ETH"
    );

    const withdrawResponse = await FundMe.withdraw();
    await withdrawResponse.wait();
    console.log("Funds withdrawn");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});