/*
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Import the CategoryScale from 'chart.js'
import { CategoryScale } from 'chart.js';

// Register the CategoryScale under the name 'category'
Chart.register(CategoryScale);

export default function AnalysePolicy() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sum of count_plan_id',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [],
      },
    ],
  });

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/obsrve_policy");
        const data = response.data;

        const labels = data.map((item) => item.policy_id);
        const countPlanId = data.map((item) => item["sum(count_plan_id)"]);

        setChartData((prevChartData) => ({
          ...prevChartData,
          labels: labels,
          datasets: [
            {
              label: 'Sum of count_plan_id',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: countPlanId,
            },
          ],
        }));

        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart("myChart", {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Sum of count_plan_id',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: countPlanId,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category', // Use the 'category' type for the x-axis
                labels: labels,
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // No dependency, so it runs only once

  return (
    <div className="App">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}*/

/*

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Import the CategoryScale from 'chart.js'
import { CategoryScale } from 'chart.js';

// Register the CategoryScale under the name 'category'
Chart.register(CategoryScale);

export default function AnalysePolicy() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Count Plan ID',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [],
      },
    ],
  });

  useEffect(() => {
    let chartInstance;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/obsrve_policy");
        const data = response.data;

        const policyTypes = data.map((item) => item.policy_type);
        const totalCountPlanId = data.map((item) => item.total_count_plan_id);

        setChartData({
          labels: policyTypes,
          datasets: [
            {
              label: 'Total Count Plan ID',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: totalCountPlanId,
            },
          ],
        });

        // Cleanup previous chart instance
        if (chartInstance) {
          chartInstance.destroy();
        }

        // Create a new chart instance
        chartInstance = new Chart("myChart", {
          type: 'bar',
          data: {
            labels: policyTypes,
            datasets: [
              {
                label: 'Total Count Plan ID',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: totalCountPlanId,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category',
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup the chart instance when the component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []); // No dependency, so it runs only once

  return (
    <div className="App">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Import the CategoryScale from 'chart.js'
import { CategoryScale } from 'chart.js';

// Register the CategoryScale under the name 'category'
Chart.register(CategoryScale);

export default function AnalysePolicy() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Count Plan ID',
        backgroundColor: [],  // Use an empty array for now
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [],
      },
    ],
  });

  useEffect(() => {
    let chartInstance;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/obsrve_policy");
        const data = response.data;

        const policyTypes = data.map((item) => item.policy_type);
        const totalCountPlanId = data.map((item) => item.total_count_plan_id);

        // Generate an array of random colors
        const colors = Array.from({ length: policyTypes.length }, () =>
          `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
        );

        setChartData({
          labels: policyTypes,
          datasets: [
            {
              label: 'Total Count Plan ID',
              backgroundColor: colors,
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: totalCountPlanId,
            },
          ],
        });

        // Cleanup previous chart instance
        if (chartInstance) {
          chartInstance.destroy();
        }

        // Create a new chart instance
        chartInstance = new Chart("myChart", {
          type: 'bar',
          data: {
            labels: policyTypes,
            datasets: [
              {
                label: 'Total Count Plan ID',
                backgroundColor: colors,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: totalCountPlanId,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category',
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup the chart instance when the component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []); // No dependency, so it runs only once

  return (
    <div className="App">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

