// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./Accounts.sol";

contract Loans{
    struct LoanAccount{
        uint id;
        uint loanBalance;
    }

    Accounts accountsContract = Accounts(0x809d550fca64d94Bd9F66E60752A544199cfAC3D);

    mapping(uint => LoanAccount) loanAccounts;

    mapping(uint => bool) existingLoanAccounts;


    function createLoanAccount(uint _id) public{
        require(accountsContract.checkIfAccountExists(_id)==true, "The account number does not exist");
        LoanAccount memory _newLoanAccount = LoanAccount(_id, 0);
        loanAccounts[_id] = _newLoanAccount;
        existingLoanAccounts[_id] = true;
    }

    function checkIfLoanAccountExists(uint256 _account_number) public view returns(bool){
        return existingLoanAccounts[_account_number];
    }

    function getLoanLimit(uint256 _account_number) public view returns(uint256){
        return accountsContract.getAverageTxs(_account_number);
    }

    function getLoanBalance(uint256 _account_number) public view returns (uint256){
        require(existingLoanAccounts[_account_number]==true, "Loan Account does not exist");
        return loanAccounts[_account_number].loanBalance;
    }

    function borrow(uint256 _amount, uint _account_number, string memory _password) public{
        //authenticate
        require(accountsContract.authenticateAccountNumber(_account_number, _password) == true, "Not authenticated");

        //check if the borrower is elligible
        require(existingLoanAccounts[_account_number] == true, "Loan account does not exist");
        require(loanAccounts[_account_number].loanBalance == 0, "Outstanding loan balance");
        require(getLoanLimit(_account_number) >= _amount, "Over loan limit");

        loanAccounts[_account_number].loanBalance += _amount;

        //update the user balance from the Accounts contract
        accountsContract.addLoanToBalance(_amount, _account_number, _password);
    }

    function repay(uint256 _amount, uint _account_number, string memory _password) public{
        require(existingLoanAccounts[_account_number] == true, "Loan Account does not exist");
        require(accountsContract.getBalance(_account_number, _password) >= _amount, "Insufficient Funds to repay");
        require(loanAccounts[_account_number].loanBalance >= _amount, "Excessive Payment");
        loanAccounts[_account_number].loanBalance -= _amount;

        //deduct the money from the user account balance
        accountsContract.deductLoanRepayment(_amount, _account_number, _password);
    }
}