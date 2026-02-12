document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const customerProfile = document.getElementById('customerProfile');
    const recommendation = document.getElementById('recommendation');

    const customers = [
        {
            id: 1,
            name: 'Innovate Corp',
            profile: {
                size: '500-1000 employees',
                revenue: {
                    '2021': '$50M',
                    '2022': '$75M',
                    '2023': '$100M'
                },
                transactions: [
                    'Large international money transfer',
                    'Bulk purchase of raw materials',
                    'Investment in new technology'
                ]
            },
            marketTrends: 'Growth in renewable energy sector. Companies are looking for sustainable financing options.'
        },
        {
            id: 2,
            name: 'Tech Solutions Ltd.',
            profile: {
                size: '200-500 employees',
                revenue: {
                    '2021': '$20M',
                    '2022': '$30M',
                    '2023': '$40M'
                },
                transactions: [
                    'Regular payroll processing',
                    'Subscription to cloud services',
                    'Loan for office expansion'
                ]
            },
            marketTrends: 'Increased demand for cybersecurity solutions. Businesses are upgrading their digital infrastructure.'
        },
        {
            id: 3,
            name: 'Global Exports Inc.',
            profile: {
                size: '1000+ employees',
                revenue: {
                    '2021': '$200M',
                    '2022': '$250M',
                    '2023': '$300M'
                },
                transactions: [
                    'Foreign exchange services',
                    'Trade finance for large shipments',
                    'Hedging against currency fluctuations'
                ]
            },
            marketTrends: 'Supply chain disruptions are a major concern. Companies are seeking to de-risk their supply chains and find new partners.'
        }
    ];

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const customer = customers.find(c => c.name.toLowerCase().includes(searchTerm));

        if (customer) {
            displayProfile(customer);
        } else {
            customerProfile.innerHTML = '<p>Customer not found.</p>';
            recommendation.innerHTML = '';
        }
    });

    function displayProfile(customer) {
        customerProfile.innerHTML = `
            <h2>${customer.name}</h2>
            <p><strong>Company Size:</strong> ${customer.profile.size}</p>
            <h3>Revenue</h3>
            <canvas id="revenueChart"></canvas>
            <h3>Recent Transactions</h3>
            <ul>
                ${customer.profile.transactions.map(t => `<li>${t}</li>`).join('')}
            </ul>
            <button id="generateButton">Generate Next Best Action</button>
        `;

        const revenueData = {
            labels: ['2021', '2022', '2023'],
            datasets: [{
                label: 'Revenue in $M',
                data: [
                    parseInt(customer.profile.revenue['2021'].replace('$','').replace('M','')),
                    parseInt(customer.profile.revenue['2022'].replace('$','').replace('M','')),
                    parseInt(customer.profile.revenue['2023'].replace('$','').replace('M',''))
                ],
                backgroundColor: 'rgba(217, 35, 45, 0.2)',
                borderColor: 'rgba(217, 35, 45, 1)',
                borderWidth: 1
            }]
        };

        const revenueChart = new Chart(document.getElementById('revenueChart'), {
            type: 'bar',
            data: revenueData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        document.getElementById('generateButton').addEventListener('click', () => {
            generateRecommendation(customer);
        });

        recommendation.innerHTML = '';
    }

    function generateRecommendation(customer) {
        let nextBestAction = '';
        let conversationStarter = '';

        if (customer.name === 'Innovate Corp') {
            nextBestAction = 'Offer Green Financing options for their next project. They are in the renewable energy sector and have shown interest in sustainable practices.';
            conversationStarter = `"I noticed your company\'s recent investment in new technology and the market\'s shift towards renewable energy. Have you considered our Green Financing options to support your sustainable initiatives?"`;
        } else if (customer.name === 'Tech Solutions Ltd.') {
            nextBestAction = 'Propose a comprehensive cybersecurity insurance package. They have been upgrading their digital infrastructure and are likely concerned about cyber threats.';
            conversationStarter = `"With the recent increase in cyber threats and your company\'s focus on digital infrastructure, I wanted to discuss how our cybersecurity insurance can protect your business from potential risks."`;
        } else if (customer.name === 'Global Exports Inc.') {
            nextBestAction = 'Introduce our new trade finance platform that helps to streamline supply chain management and reduce risks associated with international trade.';
            conversationStarter = `"Given the current global supply chain challenges, I thought you might be interested in our new trade finance platform. It\'s designed to help companies like yours manage and de-risk their international supply chains more effectively."`;
        }

        recommendation.innerHTML = `
            <h2>Next Best Action</h2>
            <p><i class="fas fa-lightbulb"></i><strong>Recommendation:</strong> ${nextBestAction}</p>
            <p><i class="fas fa-comments"></i><strong>Conversation Starter:</strong> ${conversationStarter}</p>
        `;
    }
});
