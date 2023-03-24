const {ethers} = require("hardhat")

async function main(){
    const LoansFactory = await ethers.getContractFactory("Loans");
    console.log("Deploying the loans contract...")
    const loans = await LoansFactory.deploy()
    await loans.deployed()
    console.log(`Contract deployed at ${loans.address}`)
}

main().then(()=>process.exit(0))
    .catch((error)=>{
        console.error(error)
        process.exit(1)
    })