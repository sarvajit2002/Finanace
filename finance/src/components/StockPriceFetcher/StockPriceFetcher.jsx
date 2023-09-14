import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockPriceFetcher.css'
import { Container, Typography, Select, MenuItem, Card, CardContent } from "@mui/material";
const StockPriceFetcher = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [stockData, setStockData] = useState(null);
  const stockOptions = [
    { symbol: 'HINDALCO', name: 'Hindalco Industries' },
    { symbol: 'TECHM', name: 'Tech Mahindra' },
    { symbol: 'UPL', name: 'UPL Limited' },
    { symbol: 'TATASTEEL', name: 'Tata Steel' },
    { symbol: 'WIPRO', name: 'Wipro Limited' },
    // Add more stock options as needed
  ];
  useEffect(() => {
    const fetchData = async () => {
      if(selectedStock){
      try {
        const options = {
          method: 'GET',
          url: 'https://latest-stock-price.p.rapidapi.com/price',
          params: {
            Indices: 'NIFTY 50',
          },
          headers: {
            'X-RapidAPI-Key': 'a18a237427mshee3fa8448ad55aep12a961jsn1a7c7832153c',
            'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com',
          },
        };
        const response = await axios.request(options);
        const dataFromResponse = response.data;
        
        // Find the selected stock data
        const selectedStockData = dataFromResponse.find(
          (stock) => stock.symbol === selectedStock
        );

        if (selectedStockData) {
          // Set the stock data in the state
          setStockData(selectedStockData);
          console.log(selectedStockData);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
     }
    };
    fetchData();
  }, [selectedStock]); // Empty dependency array means this effect runs once when the component mounts
 
  const handleStockChange = (e) => {
    setSelectedStock(e.target.value);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center"  gutterBottom>
        Real-Time Stock Price Viewer
      </Typography>
      <div className="stock-dropdown">
        <label>Select a Stock:</label>
        <Select
          value={selectedStock}
          onChange={handleStockChange}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="">
            <em>Select a stock</em>
          </MenuItem>
          {stockOptions.map((option) => (
            <MenuItem key={option.symbol} value={option.symbol}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {selectedStock && (
        <Card variant="outlined" className="stock-price-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Stock Price Data for {selectedStock}
            </Typography>
            {stockData ? (
              <div>
                <Typography>
                  Symbol: {stockData.symbol}
                </Typography>
                <Typography>
                  Open: {stockData.open}
                </Typography>
                <Typography>
                  Day High: {stockData.dayHigh}
                </Typography>
                <Typography>
                  Day Low: {stockData.dayLow}
                </Typography>
                {/* Add the rest of your data here */}
              </div>
            ) : (
              <Typography>Loading stock price data...</Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default StockPriceFetcher;
