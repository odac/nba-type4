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
            <div class="chart-container">
                <canvas id="revenueChart"></canvas>
            </div>
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
                backgroundColor: 'rgba(128, 0, 0, 0.2)',
                borderColor: 'rgba(128, 0, 0, 1)',
                borderWidth: 1
            }]
        };

        const revenueChart = new Chart(document.getElementById('revenueChart'), {
            type: 'bar',
            data: revenueData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
            <p><i class="fas fa-chart-line"></i><strong>Market Trends:</strong> ${customer.marketTrends} <button id="generateReportButton" class="small-button">Generate Full Report</button></p>
            <div id="fullReportContainer"></div>
        `;

        document.getElementById('generateReportButton').addEventListener('click', () => {
            generateFullReport(customer);
        });
    }

    function generateFullReport(customer) {
        const fullReportContainer = document.getElementById('fullReportContainer');
        let fullReport = `<h3>Full Market Trend Report for ${customer.name}</h3>`;

        if (customer.name === 'Innovate Corp') {
            fullReport += `<p>The renewable energy sector is experiencing exponential growth, driven by global initiatives to combat climate change. Key trends include advancements in solar and wind technology, increased investment in energy storage solutions, and a growing demand for corporate Power Purchase Agreements (PPAs). For Innovate Corp, this presents a significant opportunity to secure long-term financing for large-scale renewable energy projects. Our Green Financing products are specifically designed to support such initiatives, offering competitive rates and flexible terms that align with the long-term nature of these investments.</p>`;
        } else if (customer.name === 'Tech Solutions Ltd.') {
            fullReport += `<p>The cybersecurity landscape is rapidly evolving, with an increasing frequency and sophistication of cyberattacks. Key trends include the rise of ransomware-as-a-service, attacks on cloud infrastructure, and the use of AI in both offensive and defensive security measures. For Tech Solutions Ltd., this underscores the critical need for comprehensive protection. Our cybersecurity insurance goes beyond standard coverage, offering protection against business interruption, data recovery costs, and reputational damage. It\'s an essential component of a robust risk management strategy for any company operating in the digital space.</p>`;
        } else if (customer.name === 'Global Exports Inc.') {
            fullReport += `<p>Global supply chains are under unprecedented pressure, facing challenges from geopolitical instability, trade disputes, and logistical bottlenecks. Key trends include a shift towards supply chain regionalization, increased adoption of digital supply chain technologies for better visibility and traceability, and a greater emphasis on supplier diversification. For Global Exports Inc., our trade finance platform offers a powerful solution to navigate this complex environment. It provides real-time tracking of shipments, facilitates seamless collaboration with suppliers, and offers innovative financing options to mitigate the risks of cross-border trade.</p>`;
        }

        fullReportContainer.innerHTML = fullReport;
    }
});
