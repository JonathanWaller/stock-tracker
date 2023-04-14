import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import { chartColorMapping } from "@/utils";

import { Colors } from "chart.js/auto";

interface Props {
    stockData: any;
}

const StockChart: React.FC<Props> = ({stockData}) => {
    const canvasEl: any = useRef(null);

    console.log('IN CHART: ', stockData)

  // const colors = {
  //   purple: {
  //     default: "rgba(149, 76, 233, 1)",
  //     half: "rgba(149, 76, 233, 0.5)",
  //     quarter: "rgba(149, 76, 233, 0.25)",
  //     zero: "rgba(149, 76, 233, 0)"
  //   },
  //   indigo: {
  //     default: "rgba(80, 102, 120, 1)",
  //     quarter: "rgba(80, 102, 120, 0.25)"
  //   }
  // };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    // const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    // gradient.addColorStop(0, colors.purple.half);
    // gradient.addColorStop(0.65, colors.purple.quarter);
    // gradient.addColorStop(1, colors.purple.zero);

    // const weight = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2];
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
    //   datasets: [
    //     {
    //       backgroundColor: gradient,
    //       label: "My First Dataset",
    //       data: weight,
    //       fill: true,
    //       borderWidth: 2,
    //       borderColor: colors.purple.default,
    //       lineTension: 0.2,
    //       pointBackgroundColor: colors.purple.default,
    //       pointRadius: 3
    //     }
    //   ]


        // datasets: [
        //     {
        //         label: 'dataset 1',
        //         data: [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2],
        //         // borderColor: Utils.CHART_COLORS.red,
        //         // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        //     },
        //     {
        //         label: 'dataset 2',
        //         data: [55.2, 60.2, 52.1, 65.4, 59.9, 55.2, 52.8, 45.6, 59.6, 55.2]
        //     }
        // ]

        // datasets: data.map( x: any => { label: data.stock, data: data.stockData.high})
        datasets: stockData?.length ? stockData.map( (x:any ) => {
            return {
                label: x.stock,
                data: x.stockData.high,
                // borderColor: 'yellow'
                // borde
                // borderColor: chartColorMapping[x.stock],
                // borderColor: 'rgba(255, 0, 0, 1.1)',
                // backgroundColor: 'rgba(255, 0, 0, .4)',

                borderColor: chartColorMapping[x.stock].lineColor,
                backgroundColor: chartColorMapping[x.stock].background
            }
        }) : []
    };

    const config: any = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          // title: {
          //   display: true,
          //   text: 'Chart.js Line Chart'
          // }
        }
      }
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div >
      {/* <span>Chart.js Demo</span> */}
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}

export default StockChart;
