function toggleOddsFields() {
    const numOdds = document.getElementById('numOdds').value;
    const odds3WinContainer = document.getElementById('odds3Win-container');
    const odds3LostContainer = document.getElementById('odds3Lost-container');
    
    if (numOdds == 3) {
        odds3WinContainer.classList.remove('hidden');
        odds3LostContainer.classList.remove('hidden');
    } else {
        odds3WinContainer.classList.add('hidden');
        odds3LostContainer.classList.add('hidden');
    }
}

function hasArbitrageOpportunity(odds) {
    const totalInverseOdds = odds.reduce((sum, odd) => sum + (1 / odd), 0);
    return totalInverseOdds < 1;
}

function calculateArbitragePercentage(odds) {
    const totalInverseOdds = odds.reduce((sum, odd) => sum + (1 / odd), 0);
    const arbitragePercentage = (1 - totalInverseOdds) * 100;
    return arbitragePercentage;
}

function calculateOptimalStakes(totalInvestment, odds) {
    const totalInverseOdds = odds.reduce((sum, odd) => sum + (1 / odd), 0);
    const stakes = odds.map(odd => (totalInvestment * (1 / odd)) / totalInverseOdds);
    return stakes;
}

function calculateTotalReturn(stakes, odds) {
    return stakes.map((stake, index) => stake * odds[index]);
}

function calculateGuaranteedProfit(totalInvestment, totalReturns) {
    const minTotalReturn = Math.min(...totalReturns);
    return minTotalReturn - totalInvestment;
}

function calculateArbitrage() {
    const numOdds = document.getElementById('numOdds').value;
    const odds = [
        parseFloat(document.getElementById('odds1Win').value),
        parseFloat(document.getElementById('odds1Lost').value),
        parseFloat(document.getElementById('odds2Win').value),
        parseFloat(document.getElementById('odds2Lost').value)
    ];

    if (numOdds == 3) {
        odds.push(parseFloat(document.getElementById('odds3Win').value));
        odds.push(parseFloat(document.getElementById('odds3Lost').value));
    }
    
    const totalInvestment = parseFloat(document.getElementById('investment').value);

    const arbitrageOpportunities = [];

    // Check combination 1
    if (hasArbitrageOpportunity([odds[0], odds[3], odds[4]])) {
        const arbitragePercentage = calculateArbitragePercentage([odds[0], odds[3], odds[4]]);
        const optimalStakes = calculateOptimalStakes(totalInvestment, [odds[0], odds[3], odds[4]]);
        const totalReturns = calculateTotalReturn(optimalStakes, [odds[0], odds[3], odds[4]]);
        const guaranteedProfit = calculateGuaranteedProfit(totalInvestment, totalReturns);
        arbitrageOpportunities.push({
            "description": "win-site1, lost-site2, draw-site1",
            "arbitrage_percentage": arbitragePercentage,
            "optimal_stakes": optimalStakes,
            "total_returns": totalReturns,
            "guaranteed_profit": guaranteedProfit
        });
    }

    // Check combination 2
    if (hasArbitrageOpportunity([odds[1], odds[2], odds[5]])) {
        const arbitragePercentage = calculateArbitragePercentage([odds[1], odds[2], odds[5]]);
        const optimalStakes = calculateOptimalStakes(totalInvestment, [odds[1], odds[2], odds[5]]);
        const totalReturns = calculateTotalReturn(optimalStakes, [odds[1], odds[2], odds[5]]);
        const guaranteedProfit = calculateGuaranteedProfit(totalInvestment, totalReturns);
        arbitrageOpportunities.push({
            "description": "lost-site1, win-site2, draw-site2",
            "arbitrage_percentage": arbitragePercentage,
            "optimal_stakes": optimalStakes,
            "total_returns": totalReturns,
            "guaranteed_profit": guaranteedProfit
        });
    }

    if (arbitrageOpportunities.length > 0) {
        let resultHTML = '';
        arbitrageOpportunities.forEach(opportunity => {
            resultHTML += `
                <p class="font-bold">Arbitrage Opportunity (${opportunity.description}): Yes</p>
                <p>Arbitrage Percentage (${opportunity.description}): ${opportunity.arbitrage_percentage.toFixed(2)}%</p>
                <p>Optimal Stakes (${opportunity.description}): ${opportunity.optimal_stakes.map(stake => stake.toFixed(2)).join(', ')}</p>
                <p>Total Returns (${opportunity.description}): ${opportunity.total_returns.map(ret => ret.toFixed(2)).join(', ')}</p>
                <p>Guaranteed Profit (${opportunity.description}): ${opportunity.guaranteed_profit.toFixed(2)}</p>
            `;
        });
        document.getElementById('results').innerHTML = resultHTML;
    } else {
        document.getElementById('results').innerHTML = '<p class="font-bold">No Arbitrage Opportunities Found</p>';
    }
}
