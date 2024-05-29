import React from 'react';
import CryptoCard from './CryptoCard';  // Adjust the import path as needed

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}

interface CryptoCardsProps {
  cryptos: Crypto[];
}

const CryptoCards: React.FC<CryptoCardsProps> = ({ cryptos }) => {
  return (
    <div className="row" style={{ minHeight: "170px" }}>
      {cryptos && cryptos.map((crypto) => (
        <CryptoCard key={crypto.id} crypto={crypto} />
      ))}
    </div>
  );
};

export default CryptoCards;
