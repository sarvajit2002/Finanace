import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  registerables,
} from "chart.js";
import "./Charts.css";
Chart.register(CategoryScale, LinearScale, PointElement, ...registerables);

const Charts = () => {
  const [originalData, setOriginalData] = useState([]);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Nifty50 Close Value",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:8000/nifty50")
      .then((response) => response.json())
      .then((fetchedData) => {
        setOriginalData(fetchedData);
        const labels = fetchedData.map((item) => item.Date);
        const closePrices = fetchedData.map((item) => parseFloat(item.Close));

        setData({
          labels: labels,
          datasets: [
            {
              label: "Nifty50 Close Value",
              data: closePrices,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      });
  }, []);

  const handleTimeframeChange = (months) => {
    if (!originalData || originalData.length === 0) {
      return;
    }

    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - months);

    const filteredData = originalData.filter((item) => {
      const itemDate = new Date(item.Date);
      return itemDate >= startDate && itemDate <= currentDate;
    });

    const labels = filteredData.map((item) => item.Date);
    const closePrices = filteredData.map((item) => parseFloat(item.Close));

    setData((prevData) => ({
      ...prevData,
      labels: labels,
      datasets: [
        {
          ...prevData.datasets[0],
          data: closePrices,
        },
      ],
    }));
  };

  return (
    <div>
      <h2>Nifty50 Close Price Chart</h2>
      <div className="chart-container">
        <Line data={data} />
      </div>
      {/*<div className="timeline">
        <button onClick={() => handleTimeframeChange(1)}>1 Month</button>
        <button onClick={() => handleTimeframeChange(3)}>3 Months</button>
        <button onClick={() => handleTimeframeChange(6)}>6 Months</button>
        <button onClick={() => handleTimeframeChange(12)}>1 Year</button>
  </div>*/}
    </div>
  );
};

export default Charts;
