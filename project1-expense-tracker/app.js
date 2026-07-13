
// Render Table
const tbody = document.getElementById('subscriptionTable');
subscriptions.forEach(sub => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><strong>${sub.service}</strong></td>
        <td>${sub.category}</td>
        <td>$${sub.cost.toFixed(2)}</td>
        <td>${sub.lastUsed}</td>
        <td><span class="${sub.status === 'Ghost' ? 'status-ghost' : 'status-active'}">${sub.status}</span></td>
    `;
    tbody.appendChild(tr);
});

// Render Charts
Chart.defaults.color = '#a0a0a0';
Chart.defaults.font.family = 'Inter';

new Chart(document.getElementById('burnRateChart'), {
    type: 'bar',
    data: burnRateData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: '#333333' }, beginAtZero: true },
            x: { grid: { display: false } }
        }
    }
});

new Chart(document.getElementById('utilizationChart'), {
    type: 'doughnut',
    data: utilData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});
