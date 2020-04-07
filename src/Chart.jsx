import React, { useLayoutEffect, useRef } from "react";
import { arrayOf, number } from "prop-types";
import Chart from "chart.js";
import zip from "lodash.zip";
import merge from "lodash.merge";
import {
  possiblePatterns,
  patternReducer,
  averageReducer,
} from "./v2/optimizer";
import { Box } from "@material-ui/core";
import { useDebounce } from "react-use";

const generateData = (filter) => {
  let patterns = possiblePatterns(filter);
  const patternCount = patterns.reduce((acc, cur) => acc + cur.length, 0);
  if (patternCount === 0) patterns = possiblePatterns([0, ...filter.slice(1)]);
  const minMaxPattern = patternReducer(patterns);
  const minMaxData = zip(...minMaxPattern);
  const avgPattern = patternReducer(patterns, averageReducer);
  const avgData = zip(...avgPattern);

  return [
    {
      label: "买入价格",
      data: new Array(12).fill(filter[0] || null),
      fill: true,
      backgroundColor: "transparent",
      borderColor: "#7B6C53",
      pointRadius: 0,
      pointHoverRadius: 0,
      borderDash: [3, 9],
    },
    {
      label: "实际价格",
      data: Array.from({ length: 12 }, (v, i) => filter[i + 1] || null),
      fill: false,
      backgroundColor: "#EF8341",
      borderColor: "#EF8341",
    },
    {
      label: "平均值",
      data: avgData[0] ? avgData[0].map(Math.trunc) : new Array(12).fill(null),
      backgroundColor: "#F0E16F",
      borderColor: "#F0E16F",
      pointRadius: 0,
      fill: false,
    },
    {
      label: "最大值",
      data: minMaxData[1] || new Array(12).fill(null),
      backgroundColor: "#A5D5A5",
      borderColor: "#A5D5A5",
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: 2,
    },
    {
      label: "最小值",
      data: minMaxData[0] || new Array(12).fill(null),
      backgroundColor: "#88C9A1",
      borderColor: "#88C9A1",
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: 2,
    },
  ];
};

const ChartComponent = ({ filter }) => {
  const canvas = useRef();
  const chart = useRef();

  useLayoutEffect(() => {
    const ctx = canvas.current.getContext("2d");
    chart.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: generateData(filter),
        labels: "周一 周二 周三 周四 周五 周六"
          .split(" ")
          .reduce((acc, day) => [...acc, `${day}/上午`, `${day}/下午`], []),
      },
      options: {
        maintainAspectRatio: false,
        showLines: true,
        tooltips: {
          intersect: false,
          mode: "index",
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 300,
              },
            },
          ],
        },
      },
    });
  }, []);

  useDebounce(
    () => {
      if (!chart.current) return;
      const newData = generateData(filter);
      merge(chart.current.data.datasets, newData);
      chart.current.update();
    },
    500,
    [filter]
  );

  return (
    <Box p={2} mt={2} borderRadius={16} bgcolor="bkgs.chart">
      <canvas ref={canvas} width={600} height={400} />
    </Box>
  );
};

ChartComponent.propTypes = {
  filter: arrayOf(number).isRequired,
};

export default ChartComponent;
