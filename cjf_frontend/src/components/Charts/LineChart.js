import React from "react";
import ReactECharts from "echarts-for-react";

const LineChart = (props) => {

  const option = {
    title: {
      text: props?.title,
      textStyle: {
        fontFamily: "Poppins",
        fontSize: "1.17em",
        color: "#2a5884",
      },
    },
    grid: {
      right: "2%",
    },
    dataZoom: [
      {
        type: "slider",
      },
    ],
    toolbox: {
      feature: {
        dataView: {
          readOnly: true,
        },
        magicType: {
          type: ["line", "bar"],
        },
        restore: {},
      },
    },
    tooltip: {},
    legend: {
      data: props?.legend,
      top: 20,
      //   show: true
    },
    xAxis: {
      type: "category",
      data: props?.xAxisLabels,
    },
    yAxis: {
      axisLabel: {
        color: "black",
        fontSize: "0.6rem",
        fontWeight: 500,
        fontFamily: "Poppins",
        width: 100, //fixed number of pixels
        overflow: "break", // or 'break' to continue in a new line
        interval: 10,
        formatter: (value) => {
          return `${(value / (60 * 60)).toFixed(3)} h`;
        },
      },
      axisLine: { show: false },
      axisTick: { show: false },
      name: props?.yAxisName,
      nameTextStyle: {
        color: "black",
        fontSize: "0.6rem",
        fontWeight: 700,
        fontFamily: "Poppins",
      },
      nameLocation: "middle",
      nameGap: 65,
      splitLine: {
        lineStyle: {
          color: "transparent",
        },
      },
      type: "value",
      data: [],
    },
    series: props?.seriesData,
  };
  return (
    <ReactECharts
      option={option}
      style={{ width: "85%" }}
      opts={{ renderer: "svg" }}
      theme={"light"}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};
export default LineChart;
