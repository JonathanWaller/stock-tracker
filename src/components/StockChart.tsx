import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import { StockHistory, IndividualStockHistory } from "@/types/stock";
import { chartColorMapping, defaultChartColor } from "@/utils";

import { ChartConfig } from "@/types/chart";

interface Props {
    stockData: StockHistory[] | undefined;
}

const StockChart: React.FC<Props> = ({stockData}) => {
    const canvasEl: any = useRef(null);

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    
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
        datasets: stockData?.length ? stockData.map( (x:any ) => {
            return {
                label: x.stock,
                data: x.stockData.high,
                borderColor: chartColorMapping[x.stock]?.lineColor || defaultChartColor.lineColor,
                backgroundColor: chartColorMapping[x.stock]?.background  || defaultChartColor.background
            }
        }) : []
    };

    const config: ChartConfig = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: data.datasets.length > 1 ? true : false
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return <canvas id="myChart" ref={canvasEl} height="100" />;
}

export default StockChart;
