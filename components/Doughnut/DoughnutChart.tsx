import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProps {
	data: number[];
}

const DoughnutChart = ({ data }: DoughnutChartProps) => {
	ChartJS.register(ArcElement, Tooltip, Legend);
	const chartData = {
		labels: ["Red", "Blue", "Yellow"],
		datasets: [
			{
				label: "Expense by Type",
				data: data,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
				],
				borderWidth: 3,
			},
		],
	};
	return (
		<div className="w-80 h-80">
			<Doughnut
				data={chartData}
				options={{ responsive: true, maintainAspectRatio: false }}
			/>
		</div>
	);
};

export default DoughnutChart;
