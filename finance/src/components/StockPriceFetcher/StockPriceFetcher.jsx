import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StockPriceFetcher.css";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
} from "@mui/material";
//import Charts from "../../Charts/Charts";

const StockPriceFetcher = () => {
  const [selectedStock, setSelectedStock] = useState("");
  const [stockData, setStockData] = useState(null);
  const stockOptions = [
    { symbol: "MARUTI", name: "Maruti Suzuki India Ltd" },
    { symbol: "TECHM", name: "Tech Mahindra" },
    { symbol: "COALINDIA", name: "Coal India Ltd" },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd" },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank" },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd" },
    { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd" },
    { symbol: "BPCL", name: "Bharat Petroleum Corporation Ltd" },
    { symbol: "TATASTEEL", name: "Tata Steel" },
    { symbol: "WIPRO", name: "Wipro Limited" },
    { symbol: "TCS", name: "Tata Consultancy Services Ltd" },
    { symbol: "RELIANCE", name: "Reliance Industries Ltd" },
    { symbol: "HINDUNILVR", name: "Hindusthan Unilever" },
    // Add more stock options as needed
  ];

  const [searchText, setSearchText] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (selectedStock) {
        try {
          const options = {
            method: "GET",
            url: "https://latest-stock-price.p.rapidapi.com/price",
            params: {
              Indices: "NIFTY 50",
            },
            headers: {
              "X-RapidAPI-Key":
                "a18a237427mshee3fa8448ad55aep12a961jsn1a7c7832153c",
              "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
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
          console.error("Error fetching stock data:", error);
        }
      }
    };
    fetchData();
  }, [selectedStock]);

  const handleSearchTextChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // Filter stock options based on the search text
    const filteredOptions = stockOptions.filter((option) =>
      option.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStocks(filteredOptions);
  };

  const handleStockSelect = (selectedSymbol) => {
    setSelectedStock(selectedSymbol);
    setSearchText(""); // Clear the search text when a stock is selected
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Real-Time Stock Price Viewer
      </Typography>
      <div className="stock-search">
        <label>Search for a Stock:</label>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type to search for a stock"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <List>
          {filteredStocks.map((option) => (
            <ListItem
              key={option.symbol}
              button
              onClick={() => handleStockSelect(option.symbol)}
            >
              {option.name}
            </ListItem>
          ))}
        </List>
      </div>
      {selectedStock && (
        <Card variant="outlined" className="stock-price-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Stock Price Data for {selectedStock}
            </Typography>
            {stockData ? (
              <div>
                <Typography>Symbol: {stockData.symbol}</Typography>
                <Typography>Open: {stockData.open}</Typography>
                <Typography>Day High: {stockData.dayHigh}</Typography>
                <Typography>Day Low: {stockData.dayLow}</Typography>
                <Typography>
                  Last Update Time: {stockData.lastUpdateTime}
                </Typography>
                <Typography>Per Day Change:{stockData.pChange}</Typography>
                <Typography>30 Day Change:{stockData.perChange30d}</Typography>
                {/* Add the rest of your data here */}
              </div>
            ) : (
              <Typography>Loading stock price data...</Typography>
            )}
          </CardContent>
          {/* <Charts selectedStock={selectedStock} />*/}
        </Card>
      )}
      {/*<Button variant="contained" color="success">
        View Plans
            </Button>*/}
      <Typography variant="h4" align="center">
        Here is our predicted price for the future
      </Typography>
    </Container>
  );
};

export default StockPriceFetcher;
