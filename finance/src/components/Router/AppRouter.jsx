import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../../Dashboard/Dashboard";
import data from "../../data";
import SignIn from "../../Login/SignIn";
import SignUp from "../../Login/SignUp";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import About from "../Layout/About";
import Contact from "../Layout/Contact";
import Plan from "../../Dashboard/Plan";
import Charts from "../../Charts/Charts";
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
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard exchanges={exchanges} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoutes>
                <SignIn />
              </PublicRoutes>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoutes>
                <SignUp />
              </PublicRoutes>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <Plan />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chart" element={<Charts />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
