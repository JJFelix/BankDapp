// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Accounts{

    struct Account {
        uint256 id;
        string firstName;
        string middleName;
        string lastName;
        string phoneNumber;
        string email;
        string IDNumber;
        uint256 balance;
        uint256 avarageTxs;
        bytes32 public_key;
    }

    uint count = 1000000;

    //maping to store the accounts
    mapping(uint => Account) accounts;

    //mapping to check if an account number exists
    mapping(uint => bool) accounts_exist;

    //mapping to check if an IDnumber exists
    mapping(string => bool) IDNumber_exists;

    //mapping to check if phoneNumer exists
    mapping(string => bool) phoneNumber_exists;

    //mapping to check of email is unique
    mapping(string => bool) email_exists;

    //map id Number to account number
    mapping(string => uint) id_account;

    //authentication modifier
    modifier isAuthenticated(uint256 _account_number, string memory password){
        require(accounts_exist[_account_number] == true, "Wrong details");
        bytes32 authentication = sha256(abi.encodePacked(
            password,
            _account_number
        ));

        require(accounts[_account_number].public_key == authentication, "Wrong details");
        _;
    }

    //check if account exists
    modifier accountExists(uint256 _account_number){
        require(accounts_exist[_account_number] == true, "account number does not exist");
        _;
    }

    //check if IDnumber exists
    modifier IDIsUnique(string memory _IDNumber){
        require(IDNumber_exists[_IDNumber] == false, "ID number exists");
        _;
    }

    //check if phoneNumber exists
    modifier phoneIsUnique(string memory _phoneNumber){
        require(phoneNumber_exists[_phoneNumber] == false, "Phone Number exists");
        _;
    }

    //check if email is unique
    modifier emailIsUnique(string memory _email){
        require(email_exists[_email] == false, "Email Exists");
        _;
    }

    //authenticate using IDNumber
    modifier IDIsAuthenticated(string memory _IDNumber, string memory _password){
        require(IDNumber_exists[_IDNumber] == true, "ID number does not exist");
        uint account_number = id_account[_IDNumber];
        require(accounts_exist[account_number] == true, "Wrong IDNumber");
        bytes32 authentication = sha256(abi.encodePacked(
            _password,
            account_number
        ));

        require(accounts[account_number].public_key == authentication, "Wrong details");
        _;
    }

    //for authentication from other contracts
    function authenticateAccountNumber(uint256 _account_number, string memory _password) public view returns(bool){
        bytes32 authentication = sha256(abi.encodePacked(
            _password,
            _account_number
        ));

        return accounts[_account_number].public_key == authentication;
    }

    function checkIfAccountExists(uint256 _account_number) public view returns(bool){
        return accounts_exist[_account_number];
    }

    function getAccountDetails(string memory _IDNumber, string memory _password) public view IDIsAuthenticated(_IDNumber, _password) returns(
        uint256, string memory, string memory, string memory, string memory, string memory, string memory, uint256
    ){
        uint _account_number = id_account[_IDNumber];
        require(accounts_exist[_account_number] == true, "Wrong IDNumber");
        Account memory account = accounts[_account_number];
        return (account.id, account.firstName, account.middleName, account.lastName, account.phoneNumber, account.email, account.IDNumber, account.balance);
    }

    function login(string memory _IDNumber, string memory _password) public view IDIsAuthenticated(_IDNumber, _password) returns(bool){
        return true;
    }

    function createAccount(
            string memory password,
            string memory _firstName,
            string memory _middleName,
            string memory _lastName,
            string memory _phoneNumber,
            string memory _email,
            string memory _IDNumber
        ) public IDIsUnique(_IDNumber) phoneIsUnique(_phoneNumber) emailIsUnique(_email){

        bytes32 _public_key = sha256(abi.encodePacked(
            password,
            count
        ));
        Account memory new_account = Account(
            count,
            _firstName,
            _middleName,
            _lastName,
            _phoneNumber, 
            _email, 
            _IDNumber,
            0,
            0,
            _public_key
        );
        
        accounts[count] = new_account;
        accounts_exist[count] = true;
        IDNumber_exists[_IDNumber] = true;
        phoneNumber_exists[_phoneNumber] = true;
        email_exists[_email] = true;
        id_account[_IDNumber] = count;
        count = count +1;
    }

    function getBalance(uint256 _account_number, string memory password) public view isAuthenticated(_account_number, password) accountExists(_account_number) returns(uint256){
        return accounts[_account_number].balance;
    }

    function getAverageTxs(uint256 _account_number) public view returns(uint256){
        return accounts[_account_number].avarageTxs;
    }

    function deposit(uint256 _account_number, string memory password, uint256 amount) public isAuthenticated(_account_number, password) accountExists(_account_number) returns(uint256){
        accounts[_account_number].balance += amount;
        accounts[_account_number].avarageTxs = ((accounts[_account_number].avarageTxs/100 + amount)*100)/2;
        return accounts[_account_number].balance;
    }

    function withdraw(uint256 _account_number, string memory password, uint256 amount) public isAuthenticated(_account_number, password) accountExists(_account_number) returns(uint256){
        require(accounts[_account_number].balance >= amount, "Insufficient balance");
        accounts[_account_number].balance -= amount;
        accounts[_account_number].avarageTxs = ((accounts[_account_number].avarageTxs/100 + amount)*100)/2;
        return accounts[_account_number].balance;
    }


    function send(uint sender_account_number, uint receiver_account_number, uint amount, string memory password) public isAuthenticated(sender_account_number, password) accountExists(sender_account_number) accountExists(receiver_account_number) {
        require(accounts[sender_account_number].balance >= amount, "Insufficient funds");
        accounts[sender_account_number].avarageTxs = ((accounts[sender_account_number].avarageTxs/100 + amount)*100)/2;
        accounts[sender_account_number].balance -= amount;
        accounts[receiver_account_number].balance +=amount;
    }

    function addLoanToBalance(uint256 _loanAmount, uint256 _account_number, string memory _password) public isAuthenticated(_account_number, _password){
        accounts[_account_number].balance += _loanAmount;
    }

    function deductLoanRepayment(uint256 _repayAmount, uint256 _account_number, string memory _password) public isAuthenticated(_account_number, _password){
        accounts[_account_number].balance -= _repayAmount;
    }

}