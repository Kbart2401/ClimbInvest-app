import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as topInvestorsActions from '../../store/topInvestors'
import './topInvestors.css'

const TopInvestors = () => {
  const dispatch = useDispatch()
  const topInvestors = useSelector(state => state.topInvestors.topAccounts)

  useEffect(() => {
    dispatch(topInvestorsActions.getTopInvestors())
  }, [dispatch])

  return (
    <>
      <div className='top-investors-container'>
        <h2>Top Climbers</h2>
        <ul className='top-investors-list'>
          <table>
            {topInvestors.map((investor, idx) => (
              <tr key={idx} >
                <th>{idx +1}. {investor.username} </th>
                <td>{parseFloat(investor.current_balance)
                  .toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</td>
              </tr>
            ))}
          </table>
        </ul>
      </div>
    </>
  )
}

export default TopInvestors;