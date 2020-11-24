import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './footer.css';
import * as stockSearchActions from '../../store/stockSearch';
import { fetch } from '../../store/csrf';
import { set } from 'js-cookie';


const Footer = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [stockQuote, setQuote] = useState('');
  const [inputVal, setInput] = useState('');
  console.log('stock', stockQuote)


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(stockSearchActions.searchForStock(inputVal));
    setInput('');
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  return (
    <>
      {!sessionUser &&
        <div className='footer-container__no-user'></div>}
      {sessionUser && 
        <>
          <div className='footer-container__user'>
            <div className='footer-content'>
              <span>Markets</span>
              <span className='index-quote'>DJIA {stockQuote.latestPrice}</span>
              <span className='index-quote'>NASDAQ</span>
              <span className='index-quote'>S&P</span>
              <form onSubmit={handleSubmit}>
                <input autoComplete='off' type='text' name='search' placeholder='Quote Search'
                onChange={handleChange} />
              </form>
            </div>
          </div>
        </>}
    </>
  )
}

export default Footer;