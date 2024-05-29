import React from 'react';
import logo from '../../assets/crypto_logo.png';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="text-white text-center py-4 w-100" style={{backgroundColor: "#010B18"}}>
      <div className='d-flex justify-content-center  align-items-center' style={{cursor: "pointer"}} onClick={() =>  navigate('/')}>
      <img src={logo} alt="Crypto Price Tracker Logo" style={{ height: "30px" }} />
      </div>
    </header>
  );
};

export default Header;
