import logo from './logo.svg';
import './App.css';
import { useFormik } from 'formik';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AccountHome from './components/AccountHome';
import Transfer from './components/Transfer';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import LoansHome from './components/Loans/LoansHome'
import Borrow from './components/Loans/Borrow';
import Repay from './components/Loans/Repay';

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route exact path='' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/account-home' element={<AccountHome/>}/>
        <Route exact path='/transfer' element={<Transfer/>}/>
        <Route exact path='/deposit' element={<Deposit/>}/>
        <Route exact path='/withdraw' element={<Withdraw/>}/>
        <Route exact path='/loans-home' element={<LoansHome/>}/>
        <Route exact path='/loans-borrow' element={<Borrow/>}/>
        <Route exact path='/loans-repay' element={<Repay/>}/>
      </Routes>
    </Router>
  );
}

export default App;
