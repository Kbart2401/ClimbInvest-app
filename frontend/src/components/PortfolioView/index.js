import { useSelector } from 'react-redux';
import './PortfolioView.css';

const PortfolioView = () => {
  const accountPortfolio = useSelector(state => state.session.accountPortfolio);

  let portfolioView
  if (accountPortfolio) {
    portfolioView = accountPortfolio.map((stock, idx) => {
      return (
        <li key={idx}>
          <div>{stock.name} </div>
          <div>{stock.symbol} </div>
          <div>{stock.cost_basis} </div>
          <div>{stock.quantity}</div>
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
                <div>Cost Basis</div><div>Quantity</div>
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