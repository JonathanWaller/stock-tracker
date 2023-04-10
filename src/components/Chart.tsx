
// const dummyData = {
//     'apl': [{date: 2010, price: 150.18}, {date: 2011, price: 151.07}, {date: 2012, price: 148.11}, {date: 2013, price: 142.92}, {date: 2014, price: 145.47}, {date: 2015, price: 143.32}, {date: 2016, price: 131.86}, {date: 2017, price: 130.03}, {date: 2018, price: 130.73}, {date: 2019 ,price: 133.41}],
//     'tsla': [{date: 2010, price: 135.18}, {date: 2011, price: 136.17}, {date: 2012, price: 139.99}, {date: 2013, price: 137.23}, {date: 2014, price: 141.35}, {date: 2015, price: 144.23}, {date: 2016, price: 132.23}, {date: 2017, price: 133.23}, {date: 2018, price: 133.88}, {date: 2019, price: 135.88}]
// }

// const Chart = () => {

//     return(
//         <div>Chart</div>
//     )
// }

// export default Chart;



import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PortfolioChart() {
  const canvasEl: any = useRef(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const weight = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2];
    // const weight =[
    //   [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2],
    //   [55.2, 60.2, 52.1, 65.4, 59.9, 55.2, 52.8, 45.6, 59.6, 55.2]
    // ] 
      

    const labels = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10"
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "My First Dataset",
          data: weight,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3
        }
      ]
    };
    const config: any = {
      type: "line",
      data: data
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="App">
      <span>Chart.js Demo</span>
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}