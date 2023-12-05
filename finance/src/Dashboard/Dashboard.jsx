import React from "react";
import Header from "../components/Header/Header";
import Subheader from "../components/Subheader/Subheader";
import Layout from "../components/Layout/Layout";
//import ExchangeList from "../components/ExchangeList/ExchangeList";
import StockPriceFetcher from "../components/StockPriceFetcher/StockPriceFetcher";
import Plan from "./Plan";
import Charts from "../Charts/Charts";
//import Charts from "../Charts/Charts";
const Dashboard = () => {
  return (
    <>
      <Header />
      <Subheader>{/*<ExchangeList exchanges={exchanges} />*/}</Subheader>
      <StockPriceFetcher />
      <Charts />
      <Plan />
      <Layout />
    </>
  );
};

export default Dashboard;
