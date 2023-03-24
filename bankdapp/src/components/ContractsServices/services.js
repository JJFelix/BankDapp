import React from 'react';
import { AccountsABI } from './resources';
import { LoansABI } from './resources';
import { ethers } from 'ethers'



export function getAccountsContract(){
    //connect to the smart contract
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const address = process.env.REACT_APP_ACCOUNTS_ADDRESS
    const accounts = new ethers.Contract("0x809d550fca64d94Bd9F66E60752A544199cfAC3D", AccountsABI, provider)

    //signer
    const accountsSigner = provider.getSigner()
    const accountsContract = accounts.connect(accountsSigner)
    return accountsContract
}

export function getLoansContract(){
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const address = process.env.REACT_APP_LOANS_ADDRESS;
    const loans = new ethers.Contract("0xc351628EB244ec633d5f21fBD6621e1a683B1181", LoansABI, provider);

    //signer
    const loansSigner = provider.getSigner()
    const loansContract = loans.connect(loansSigner)

    return loansContract
}