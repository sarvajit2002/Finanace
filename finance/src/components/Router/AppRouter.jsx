import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Dashboard from '../../Dashboard/Dashboard'
import data from "../../data";

const AppRouter = () => {
  const [exchanges, setExchanges] = useState([]);
  //const [stocks, setStocks] = useState([]);

  const getData = () => {
    const exchanges = data.exchanges;
    //const stocks = data.stocks;

    return {
      exchanges,
      //stocks,
    };
  };
  useEffect(() => {
    const { exchanges } = getData();

    setExchanges(exchanges);
    //setStocks(stocks);
  }, []);
    return(
      <>
       <Router>
         <Routes>
         <Route
          path="/"
          element={<Dashboard exchanges={exchanges} />}
        />

         </Routes>
       </Router>
      </>
    )
}

export default AppRouter