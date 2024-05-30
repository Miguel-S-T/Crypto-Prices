import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TextField , IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CryptoCards from '../CryptoCard/CryptoCards';

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    isFavorite: boolean;
}

interface CryptoListProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  }


const CryptoList: React.FC<CryptoListProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columns: GridColDef[] = [
    {
      field: 'favorite',
      headerName: 'Favorite',
      width: 150,
      renderCell: (params: GridRenderCellParams<Crypto, string>) => (
        <Tooltip title="Add to favorites">
        <IconButton onClick={() => handleFavoriteClick(params.row.id)} color={params.row.isFavorite ? "primary" : "default"}>
            {params.row.isFavorite ? <StarIcon /> : <StarOutlineIcon />}
          </IconButton>
        </Tooltip>
         
      )
  },
    { field: 'market_cap_rank', headerName: 'Rank', width: 150 },
    { field: 'image', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value as string} alt="" style={{ width: 32, height: 32 }} /> },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      renderCell: (params: GridRenderCellParams<Crypto, string>) => (
        <Link to={`/crypto/${params.row.id}`} style={{color: "#88DEF2"}}>
        {params.value}
      </Link>
      )
    },
    { field: 'symbol', headerName: 'Symbol', width: 150 },
    { field: 'current_price', headerName: 'Price (USD)', width: 150, type: 'number' },
    { field: 'market_cap', headerName: 'Market Cap', width: 150, type: 'number' },
    { field: 'total_volume', headerName: 'Total Volume', width: 150, type: 'number' },
  ];

  const fetchCryptoData = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiParams = import.meta.env.VITE_API_PARAMS;

    fetch(`${apiUrl}/coins/markets?${apiParams}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result) {
          console.log("No data available.");
          return
        }

         // Load favorites from localStorage
         const savedFavorites = localStorage.getItem('cryptoFavorites');
         const parsedFavorites: string[] = savedFavorites ? JSON.parse(savedFavorites) : [];
 
         // Adjust the price of each crypto with a random value near 0.10
         const adjustedData = result.map((crypto: Crypto) => {
             const adjustment = parseFloat((Math.random() * 0.2 - 0.1).toFixed(2));
             const newPrice = Math.max(0, crypto.current_price + adjustment);
             return {
                 ...crypto,
                 current_price: newPrice,
                 isFavorite: parsedFavorites.includes(crypto.id) // Set isFavorite based on saved favorites
             };
         });

        setCryptos(adjustedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the crypto data!", error);
        setLoading(false);
      });
  };

  // Filter the cryptos data based on the search query
  const filteredRows = useMemo(() => {
    const sortedCryptos = [...cryptos].sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
    
    return searchQuery
      ? sortedCryptos.filter(
          (crypto) =>
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : sortedCryptos;
  }, [cryptos, searchQuery]);

  useEffect(() => {
    fetchCryptoData();

    // Fetch data every minute
    const intervalId = setInterval(fetchCryptoData, 60000);

    return () => clearInterval(intervalId);
  }, []);
  

  const first4Cryptos = useMemo(() => {
    const savedFavorites = localStorage.getItem('cryptoFavorites');
    const parsedFavorites: string[] = savedFavorites ? JSON.parse(savedFavorites) : [];

      // Filter cryptos to get the top 4 favorites if available
      const top4Favorites = cryptos.filter(crypto => parsedFavorites.includes(crypto.id)).slice(0, 4);

      // If the length of top4Favorites is less than 4, fill the rest with non-favorite cryptos
      const remainingCryptos = cryptos.filter(crypto => !parsedFavorites.includes(crypto.id));
      const remainingCount = 4 - top4Favorites.length;
      const nextCryptos = remainingCryptos.slice(0, remainingCount);

      return [...top4Favorites, ...nextCryptos];
}, [cryptos]);


const handleFavoriteClick = (id: string) => {
     const isAlreadyFavorite = cryptos.some(crypto => crypto.id === id && crypto.isFavorite);

     const newFavorites = cryptos.map(crypto =>
         crypto.id === id ? { ...crypto, isFavorite: !isAlreadyFavorite } : crypto
     );

     const updatedFavorites = newFavorites.filter(crypto => crypto.isFavorite).map(crypto => crypto.id);
 
     localStorage.setItem('cryptoFavorites', JSON.stringify(updatedFavorites));

     setCryptos(newFavorites);
};

  return (
    <div>
    <div className='container mt-4' >
        <CryptoCards cryptos={first4Cryptos} />
  <div className="d-flex flex-lg-row flex-column justify-content-center justify-content-lg-between align-items-center">
  <div className="coin-table-title pt-2 d-flex flex-column justify-content-center text-center text-lg-start">
  <h5 style={{fontWeight: 600}}>Cryptocurrency Prices by Market Cap</h5>
  <p style={{fontSize: "12px", marginTop: "-0.3rem"}}>The global crypto market cap is <span style={{fontWeight: 600 }}>$2.57T</span>, a<span style={{ color: "#20C886", marginRight: "-3px"}}>
  <ArrowDropUpIcon /></span><span style={{color: "#20C886",}}>0.78%</span> increase over the last day.</p>
  </div>
  <div className='mb-3 mb-lg-0'>
      <TextField
        size='small'
        label='Search'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{  minWidth: 305 }}
        className="search-textfield"
        InputLabelProps={{
          style: {
            width: '100%',
            color: 'white'
          } }} 

        sx={{
          background: 'linear-gradient(45deg, #0C223C 15%, #88DEF2 110%)',
        }}
      />
      </div>
    </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows || []}
          columns={columns}
          loading={loading}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
              
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
         disableRowSelectionOnClick
         sx={{
          border: 0,
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiDataGrid-filler': {
            backgroundColor: "#0C223C",
            color: "white",
            fontWeight: 600,

          },
          '& .MuiDataGrid-overlay': {
            backgroundColor: "#0C223C",
            color: "white",
          },
          "& .MuiDataGrid-footerContainer": {
            border: 0,
          },
          "& .MuiTablePagination-selectLabel": {
            color: "white",
            margin: "0 5px",
          },
          "& .MuiSelect-select": {
            color: "white",
          },
          "& .MuiTablePagination-displayedRows": {
            color: "white", 
            margin: "0 5px",
          },
          "& .MuiSvgIcon-root": {
            color: "white"
          }
        }}
        />
      </div>
    </div>
    </div>
  );
};

export default CryptoList;


