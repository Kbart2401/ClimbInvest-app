import React, { useState } from 'react';
import TradePage from '../TradePage';
import TradeHistory from '../TradeHistory';
import Footer from '../Footer';
import './TradeHeader.css';

const TradeHeader = () => {
  const [renderTrade, setRenderTrade] = useState(true)
  const [renderHistory, setRenderHistory] = useState(false)

  const handleTradePage = () => {
    setRenderTrade(true)
    setRenderHistory(false)
  }

  const handleHistoryPage = () => {
    setRenderHistory(true)
    setRenderTrade(false)
  }

  return (
    <>
      <div className='trade-header-container'>
        <h1>Trade</h1>
        <div className='trade-nav-container'>
          <button onClick={handleTradePage} className={renderTrade ? 'active' : ''}>
            Enter a trade</button>
          <button onClick={handleHistoryPage} className={renderHistory ? 'active' : ''}>
            Trading Activity</button>
        </div>
      </div>
      <div className='below-nav-container' style={{ padding: 0 }}>
        {renderTrade && <TradePage />}
        {renderHistory && <TradeHistory />}
      </div>
      <Footer />
    </>
  )
}

export default TradeHeader