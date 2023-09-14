import React from 'react'
import Header from '../components/Header/Header'
import Subheader from '../components/Subheader/Subheader'
import Layout from '../components/Layout/Layout'
import ExchangeList from '../components/ExchangeList/ExchangeList'
import StockPriceFetcher from '../components/StockPriceFetcher/StockPriceFetcher'
const Dashboard = ({ exchanges, stocks, setStocks }) =>  {
  return (
    <>
    <Header/>
    <Subheader>
    <ExchangeList exchanges={exchanges} />
    </Subheader>
     <StockPriceFetcher/>
    <Layout/>
    </>
  )
}

export default Dashboard