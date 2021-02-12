import StockDetails from '../StockDetails';
import ReactHighcharts from 'react-highcharts';

const StockOverview = (props) => {

  const data = [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05]]

  const config = {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'AAPL Stock Price'
    },
    series: [{
      name: 'AAPL',
      data: data,
      tooltip: {
        valueDecimals: 2
      }
    }]
  };

  return (
    <>
      <div className='company-description-title'>
        <div className='company-description-body'>
          <ReactHighcharts config={config}/>
        </div>
      </div>
      <StockDetails {...props} />
    </>
  )
}

export default StockOverview;