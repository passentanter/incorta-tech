import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ChartSection = ({ comparisonDrivers }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: comparisonDrivers.title,
      align: "left",
    },

    xAxis: {
      categories: comparisonDrivers.xAxis,
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "1000 metric tons (MT)",
      },
    },
    tooltip: {
      valueSuffix: " (1000 MT)",
    },
    plotOptions: {
      column: {
        pointWidth: 20,
        pointPadding: 0.5,
        borderWidth: 0,
      },
      series: {
        pointWidth: 5,
      },
    },

    series: [
      {
        name: "Wheat",
        data: comparisonDrivers.yAxis,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartSection;
