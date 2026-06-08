"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

export default function ActivityChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/admin/api/activity");
      const json = await res.json();

      const days = Object.keys(json).sort();
      const counts = days.map((d) => json[d]);

      setLabels(days);
      setValues(counts);
    }

    load();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Reservas por día",
        data: values,
        fill: true,
        borderColor: "#8a6f4d",
        backgroundColor: "rgba(138, 111, 77, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#8a6f4d",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#444" },
      },
      y: {
        ticks: { color: "#444" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Actividad de reservas (últimos 30 días)
      </h2>
      <Line data={data} options={options} />
    </div>
  );
}