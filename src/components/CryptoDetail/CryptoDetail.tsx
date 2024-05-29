import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

interface CryptoDetailProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CryptoDetail: React.FC<CryptoDetailProps> = ({  setSearchQuery}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ______ useStates ______
  const [chartData, setChartData] = useState<MarketChartData | null>(null);
  const [errorFetching, setErrorFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarketChartData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(`${apiUrl}/coins/${id}/market_chart?vs_currency=usd&days=7`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const data = await response.json();
   
        setChartData(data);
      } catch (error) {
        console.error("Error fetching market chart data:", error);
        setErrorFetching(true)
      }
    };

    fetchMarketChartData();
  }, [id]);

  if (!chartData) {
    return (
      <div className='container mt-5'>
      <h2 className='coin-table-title'>Crypto Detail for {id}</h2>
    <div className='container p-4'  >
    <div className='d-flex justify-content-center' style={{ height: '500px', marginBottom: '20px', paddingTop: "10rem" }}>
   
    {!errorFetching ?  <CircularProgress />: <p className='coin-table-title'>No data available.</p>}
    </div>
    </div>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        size='small'
      >
        Back to Home
      </Button>
    </div>
    )
  } 

  const lineChartData = {
    labels: chartData.prices.map(price => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: chartData.prices.map(price => price[1]),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'white', 
        },
        title: {
          color: 'white', 
        },
      },
      y: {
        ticks: {
          color: 'white', 
        },
        title: {
          color: 'white', 
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Price Chart',
        color: 'white', 
      },
    },
  };

  return (
    <div className='container mt-5'>
      <h2 className='coin-table-title'>Crypto Detail for {id}</h2>
    <div className='container p-4'  >
    <div style={{ height: '500px', marginBottom: '20px' }}>
    <Line data={lineChartData} options={options}/>

    </div>
    </div>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/')
          setSearchQuery('') 
        }}
        size='small'
        style={{ padding: '8px 20px' }}

      >
        Back to Home
      </Button>
    </div>
  );
};

export default CryptoDetail;
