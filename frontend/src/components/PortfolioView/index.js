import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './PortfolioView.css';

const PortfolioView = () => {
  const accountPortfolio = useSelector(state => state.session.accountPortfolio);

  let portfolioView

  if (accountPortfolio) {
    portfolioView = accountPortfolio.map((stock, idx) => {
      let marketValue = (stock.latestPrice * stock.quantity).toFixed(2)
      let gainLoss = (marketValue - stock.totalCost).toFixed(2)
      return (
        <li key={idx} className='portfolio-details'>
          <div>{stock.name} </div>
          <div>{stock.symbol} </div>
          <div>{stock.latestPrice}</div>
          <div>{`$${stock.change}`} {`${stock.changePercent}%`}</div>
          <div>{stock.quantity}</div>
          <div>{marketValue}</div>
          <div>{stock.totalCost} </div>
          <div>{gainLoss} </div>
        </li>
      )
    })
  }

  return (
    <>
      <div className='home-page-body'>
        <div className='portfolio-container'>
          <h2>Portfolio</h2>
          <div className='account-securities-container'>
            <ul className='account-securities'>
              <li><div>Name</div><div>Symbol</div>
                <div>Latest Price($)</div><div>Price Change</div>
                <div>Quantity</div><div>Market Value($)</div>
                <div>Total Cost($)</div><div>Unrealized Gain/Loss($)</div>
              </li>
              {portfolioView}
            </ul>
          </div>
        </div>
      </div>
    </>
  )

}

export default PortfolioView