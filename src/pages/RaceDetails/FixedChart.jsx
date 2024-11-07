import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const FixedChart = ({ comparison }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "taken to complete the race for the first three drivers",
      align: "left",
    },
    xAxis: {
      categories: comparison.driverName,
      crosshair: true,
      accessibility: {
        description: "Drivers Name",
      },
    },

    tooltip: {
      valueSuffix: "(1000 MT)",
    },
    plotOptions: {
      column: {
        pointWidth: 50,
        pointPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Driver",
        data: comparison.driveTime,
      },
    ],
  };

  //   Highcharts.chart("container", {
  //     title: {
  //       text: "Sales of petroleum products March, Norway",
  //       align: "left",
  //     },
  //     xAxis: {
  //       categories: [
  //         "Jet fuel",
  //         "Duty-free diesel",
  //         "Petrol",
  //         "Diesel",
  //         "Gas oil",
  //       ],
  //     },
  //     yAxis: {
  //       title: {
  //         text: "Million liters",
  //       },
  //     },
  //     tooltip: {
  //       valueSuffix: " million liters",
  //     },
  //     plotOptions: {
  //       series: {
  //         borderRadius: "25%",
  //       },
  //     },
  //     series: [
  //       {
  //         type: "column",
  //         name: "2020",
  //         data: [59, 83, 65, 228, 184],
  //       },
  //       {
  //         type: "column",
  //         name: "2021",
  //         data: [24, 79, 72, 240, 167],
  //       },
  //       {
  //         type: "column",
  //         name: "2022",
  //         data: [58, 88, 75, 250, 176],
  //       },
  //       {
  //         type: "line",
  //         step: "center",
  //         name: "Average",
  //         data: [47, 83.33, 70.66, 239.33, 175.66],
  //         marker: {
  //           lineWidth: 2,
  //           lineColor: Highcharts.getOptions().colors[3],
  //           fillColor: "white",
  //         },
  //       },
  //       {
  //         type: "pie",
  //         name: "Total",
  //         data: [
  //           {
  //             name: "2020",
  //             y: 619,
  //             color: Highcharts.getOptions().colors[0], // 2020 color
  //             dataLabels: {
  //               enabled: true,
  //               distance: -50,
  //               format: "{point.total} M",
  //               style: {
  //                 fontSize: "15px",
  //               },
  //             },
  //           },
  //           {
  //             name: "2021",
  //             y: 586,
  //             color: Highcharts.getOptions().colors[1], // 2021 color
  //           },
  //           {
  //             name: "2022",
  //             y: 647,
  //             color: Highcharts.getOptions().colors[2], // 2022 color
  //           },
  //         ],
  //         center: [75, 65],
  //         size: 100,
  //         innerSize: "70%",
  //         showInLegend: false,
  //         dataLabels: {
  //           enabled: false,
  //         },
  //       },
  //     ],
  //   });


  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default FixedChart;
