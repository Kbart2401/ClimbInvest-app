import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as topInvestorsActions from '../../store/topInvestors'

const TopInvestors = () => {
  const dispatch = useDispatch()
  const topInvestors = useSelector(state => state.topInvestors.topAccounts)

  useEffect(() => {
    dispatch(topInvestorsActions.getTopInvestors())
  }, [])

  return (
    <>
      <h3>Top Climbers</h3>
      <ul>
        {topInvestors.map((investor, idx) => (
          <li key={idx}>
            <div>{investor.username}</div>
            <div>{investor.current_balance}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TopInvestors;