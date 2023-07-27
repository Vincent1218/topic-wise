import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ disciplineData }) {
    //remove total from disciplineData
    delete disciplineData.total;
  const labels = Object.keys(disciplineData);
  const data = labels.map((label) => disciplineData[label].percentage);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(75,192,192,0.6)",
          "rgba(255,99,132,0.6)",
          "rgba(255,205,86,0.6)",
          "rgba(153,102,255,0.6)",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center max-h-[400px]">
      <h1 className="text-3xl font-bold">Topic Outline</h1>
      <Pie data={chartData} />
    </div>
  );
}
