
let categoryChart;

async function loadChartData() {
    const response = await fetch('/api/categories');
    return await response.json();
}

async function renderChart() {
    const chartData = await loadChartData();
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    categoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.map(item => item.category),
            datasets: [{
                label: 'Product Count',
                data: chartData.map(item => item.count),
                backgroundColor: [
                    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
                    '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.parsed.y} products`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}


window.updateChart = renderChart;


document.addEventListener('DOMContentLoaded', renderChart);