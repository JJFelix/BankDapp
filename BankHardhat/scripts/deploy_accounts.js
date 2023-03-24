const {ethers} = require("hardhat");

async function main(){
  const AccountsFactory = await ethers.getContractFactory("Accounts");
  console.log("Deploying the Accounts Contract...");
  const accounts = await AccountsFactory.deploy()
  await accounts.deployed()
  console.log(`Contract deployed at ${accounts.address}`)

  const createAccountTxn = await accounts.createAccount("maths", "IAN", "MARK", "OKEYO", "0796417598", "ian@gmail.com", "39087227")
  await createAccountTxn.wait(1)

  const depositTxn = await accounts.deposit(1000000, "maths", 300)
  await depositTxn.wait(1)

  const balance = await accounts.getBalance(1000000, "maths")
  console.log(balance)

}

main().then(()=>process.exit(0))
  .catch((error)=>{
    console.error(error)
    process.exit(1)
  })