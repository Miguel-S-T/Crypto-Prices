import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}

interface CryptoCardProps {
  crypto: Crypto;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <Card className='top-cards-favorites'>
        <CardContent className="d-flex align-items-center justify-content-between">
          <div>
            <Typography variant="h5" component="h2">
              {crypto.name}
            </Typography>
            <Typography color="#c4c4c4">
              {crypto.symbol}
            </Typography>
            <Typography variant="body2" component="p">
              Price (USD): {crypto.current_price}
            </Typography>
          </div>
          <img src={crypto.image} alt={crypto.name} style={{ width: 50, height: 50 }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoCard;
