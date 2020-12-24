import { useSelector } from 'react-redux';
import './PortfolioView.css';

const PortfolioView = () => {
  const accountPortfolio = useSelector(state => state.session.accountPortfolio);

  let portfolioView

  if (accountPortfolio) {
    portfolioView = accountPortfolio.map((stock, idx) => {
      let marketValue = (stock.latestPrice * stock.quantity).toFixed(2)
      let gainLoss = (marketValue - stock.totalCost).toFixed(2)
      let color;
      let gLcolor;
      if (stock.change < 0) color = 'red'
      else color = 'green'
      if (gainLoss < 0) gLcolor = 'red'
      else gLcolor = 'green'
      return (
        <li key={idx} className='portfolio-details'>
          <div>{stock.name} </div>
          <div>{stock.symbol} </div>
          <div>{stock.latestPrice.toLocaleString()}</div>
          <div className={color}>{`$${parseFloat(stock.change).toFixed(2)}`} <br />
            {`${parseFloat(stock.changePercent).toFixed(2)}%`}</div>
          <div>{stock.quantity}</div>
          <div>{parseFloat(marketValue).toLocaleString()}</div>
          <div>{parseFloat(stock.totalCost).toLocaleString()} </div>
          <div className={gLcolor}>{gainLoss}</div>
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