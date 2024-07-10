import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface chartProps {
    data: number[]
}

const PieChart: React.FC<chartProps> = ({ data }) => {
    const chartData = {
        labels: ['Mobile', 'Laptop', 'Others'],
        datasets: [
            {
                label: 'Number of Products',
                data: data,
                backgroundColor: [
                    '#0e7490',
                    '#4f46e5',
                    '#dc2626',
                ],
                borderColor: [
                    '#0e7490',
                    '#4f46e5',
                    '#dc2626',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;