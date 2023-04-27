interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor: string;
    }[]
}

interface ChartOptions {
    responsive: boolean;
    scales: {
        y: {
            beginAtZero: boolean
        }
    };
    plugins: {
        legend: {
            position: 'top' | 'bottom'
        }
    }
}

export interface ChartConfig {
    type: 'line' | 'bar';
    data: ChartData;
    options: ChartOptions
}