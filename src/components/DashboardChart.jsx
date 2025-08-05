import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Row, Col } from "react-bootstrap";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const DashboardChart = ({ activities }) => {
  const income = activities
    .filter((a) => a.type === "income")
    .reduce((sum, a) => sum + a.amount, 0);
  const expense = activities
    .filter((a) => a.type === "expense")
    .reduce((sum, a) => sum + a.amount, 0);

  // Pie Chart Data
  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [
          "rgba(16, 185, 129, 0.85)", // income: teal-green
          "rgba(239, 68, 68, 0.85)", // expense: red
        ],
        borderColor: ["rgba(16, 185, 129, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 3,
        hoverOffset: 12,
      },
    ],
  };

  // Group transactions by month
  const grouped = activities.reduce((acc, a) => {
    const month = new Date(a.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][a.type] += a.amount;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Income",
        data: Object.values(grouped).map((v) => v.income),
        backgroundColor: "#22C55E",
        borderRadius: 6,
        barThickness: 30,
      },
      {
        label: "Expense",
        data: Object.values(grouped).map((v) => v.expense),
        backgroundColor: "#F87171",
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  // Pie Chart Options (no axes)
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: { size: 14, weight: "bold" },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#10B981",
        bodyColor: "#ffffff",
        borderColor: "#334155",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${
              context.label
            }: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Bar Chart Options (with axes)
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: {
          color: "#ffffff",
          callback: (val) => `$${val}`,
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="my-5 text-white">
      <Row className="g-4">
        <Col xs={12} md={6}>
          <div
            className="p-4 rounded"
            style={{
              backgroundColor: "#1E293B",
              height: "400px",
            }}
          >
            <h5 className="text-center mb-4">Income vs Expense</h5>
            <div style={{ height: "300px" }}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div
            className="p-4 rounded"
            style={{ backgroundColor: "#1E293B", height: "400px" }}
          >
            <h5 className="text-center mb-4">Monthly Cash Flow</h5>
            <div style={{ height: "300px" }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardChart;
