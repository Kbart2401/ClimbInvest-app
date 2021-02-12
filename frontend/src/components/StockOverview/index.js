import { useEffect, useState } from 'react';
import StockDetails from '../StockDetails';
import ReactHighcharts from 'react-highcharts';

const StockOverview = (props) => {
  const [prices, setPrices] = useState([])
  const [dates, setDates] = useState([])

  useEffect(() => {
    let priceArray = []
    let dateArray = []
    props.chartData.forEach(stock => {
      priceArray.unshift([stock.close])
      dateArray.unshift([stock.date])
    })
    setPrices([...priceArray])
    setDates([...dateArray])
  }, [props])


  const config = {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: `${props.stockData.symbol.toUpperCase()} 10 day price`
    },
    xAxis: {
      categories: dates
    },
    series: [{
      name: 'Closing price',
      data: prices,
      tooltip: {
        valueDecimals: 2
      }
    }]
  };

  return (
    <>
      <div className='company-description-title'>
        <div className='company-description-body'>
          <ReactHighcharts config={config} />
        </div>
      </div>
      <StockDetails {...props} />
    </>
  )
}

export default StockOverview;