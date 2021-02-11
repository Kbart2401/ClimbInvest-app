import React from 'react';
import TradePage from '../TradePage';
import './TradeHeader.css';

const TradeHeader = () => {

  return (
    <>
      <div className='trade-header-container'>
        <h1>Trade</h1>
        <div className='trade-nav-container'>
          <button>Enter a trade</button>
          <button>Trading Activity</button>
        </div>
      </div>
      <TradePage />
    </>
  )
}

export default TradeHeader