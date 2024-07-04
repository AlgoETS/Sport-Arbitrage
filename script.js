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

    if (hasArbitrageOpportunity(odds)) {
        const arbitragePercentage = calculateArbitragePercentage(odds);
        const optimalStakes = calculateOptimalStakes(totalInvestment, odds);
        const totalReturns = calculateTotalReturn(optimalStakes, odds);
        const guaranteedProfit = calculateGuaranteedProfit(totalInvestment, totalReturns);

        document.getElementById('results').innerHTML = `
            <p class="font-bold">Arbitrage Opportunity: Yes</p>
            <p>Arbitrage Percentage: ${arbitragePercentage.toFixed(2)}%</p>
            <p>Optimal Stakes: ${optimalStakes.map(stake => stake.toFixed(2)).join(', ')}</p>
            <p>Total Returns: ${totalReturns.map(ret => ret.toFixed(2)).join(', ')}</p>
            <p>Guaranteed Profit: ${guaranteedProfit.toFixed(2)}</p>
        `;
    } else {
        document.getElementById('results').innerHTML = `<p class="font-bold">Arbitrage Opportunity: No</p>`;
    }
}
