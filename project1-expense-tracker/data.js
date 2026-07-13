
const subscriptions = [
    { service: 'Netflix', category: 'Entertainment', cost: 15.99, lastUsed: '2 days ago', status: 'Active' },
    { service: 'Spotify', category: 'Music', cost: 9.99, lastUsed: 'Today', status: 'Active' },
    { service: 'ChatGPT Plus', category: 'Productivity', cost: 20.00, lastUsed: 'Today', status: 'Active' },
    { service: 'Gym Membership', category: 'Health', cost: 30.00, lastUsed: '45 days ago', status: 'Ghost' },
    { service: 'iCloud+', category: 'Storage', cost: 2.99, lastUsed: 'Background', status: 'Active' },
    { service: 'Adobe CC', category: 'Productivity', cost: 52.99, lastUsed: '5 days ago', status: 'Active' },
    { service: 'Audible', category: 'Entertainment', cost: 14.95, lastUsed: '60 days ago', status: 'Ghost' }
];

const burnRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Monthly Spend ($)',
        data: [1100, 1150, 1300, 1250, 1280, 1240],
        backgroundColor: '#e0e0e0',
        borderRadius: 4
    }]
};

const utilData = {
    labels: ['High Usage', 'Moderate', 'Ghost (Unused)'],
    datasets: [{
        data: [60, 25, 15],
        backgroundColor: ['#22c55e', '#fbbf24', '#ef4444'],
        borderWidth: 0
    }]
};
