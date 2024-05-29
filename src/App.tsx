import React, {useState} from 'react'
import CryptoList from './components/CryptoList/CryptoList'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoDetail from './components/CryptoDetail/CryptoDetail';
import "./App.css"

const App : React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
    
        <Router>
      <div className='d-flex justify-content-center'>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<CryptoList searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
        <Route path="/crypto/:id" element={<CryptoDetail setSearchQuery={setSearchQuery}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App
