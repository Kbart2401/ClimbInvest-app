
const StockOverview = (props) => {

  return (
    <>
      <div className='company-description-title'>Business Description
        <div className='company-description-body'></div>
      </div>
      <div className='stock-financial-data'>
        <table>
          <caption>Overview</caption>
          <tbody>
            <tr>
              <th>Previous Close</th>
              <td>${props.stockData.previousClose}</td>
            </tr>
            <tr>
              <th>52 Week High</th>
              <td>${props.stockData.week52High}</td>
            </tr>
            <tr>
              <th>52 Week Low</th>
              <td>${props.stockData.week52Low}</td>
            </tr>
            <tr>
              <th>Avg 30 Day Volume</th>
              <td>{props.stockData.avgTotalVolume}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StockOverview;