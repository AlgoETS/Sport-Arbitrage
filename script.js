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
    const odds = [
        parseFloat(document.getElementById('odds1').value),
        parseFloat(document.getElementById('odds2').value),
        parseFloat(document.getElementById('odds3').value)
    ];
    const totalInvestment = parseFloat(document.getElementById('investment').value);

    if (hasArbitrageOpportunity(odds)) {
        const arbitragePercentage = calculateArbitragePercentage(odds);
        const optimalStakes = calculateOptimalStakes(totalInvestment, odds);
        const totalReturns = calculateTotalReturn(optimalStakes, odds);
        const guaranteedProfit = calculateGuaranteedProfit(totalInvestment, totalReturns);

        document.getElementById('results').innerHTML = `
            <p>Arbitrage Opportunity: Yes</p>
            <p>Arbitrage Percentage: ${arbitragePercentage.toFixed(2)}%</p>
            <p>Optimal Stakes: ${optimalStakes.map(stake => stake.toFixed(2)).join(', ')}</p>
            <p>Total Returns: ${totalReturns.map(ret => ret.toFixed(2)).join(', ')}</p>
            <p>Guaranteed Profit: ${guaranteedProfit.toFixed(2)}</p>
        `;
    } else {
        document.getElementById('results').innerHTML = `<p>Arbitrage Opportunity: No</p>`;
    }
}
