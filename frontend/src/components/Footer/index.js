import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './footer.css';
import * as stockSearchActions from '../../store/stockSearch';
import { useHistory } from 'react-router-dom';

const Footer = () => {
  const sessionUser = useSelector(state => state.session.user)
  const stockData = useSelector(state => state.stockSearch.stock)
  const dispatch = useDispatch();
  const [inputVal, setInput] = useState('');
  const [isSubmitted, setSubmit] = useState(false);
  const history = useHistory()

  useEffect(() => {
    if(isSubmitted) {
      setSubmit(false)
      console.log('INSIDE USE EFFECT', isSubmitted)
      return () => history.push('/stock-info')
    }
  }, [isSubmitted])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(stockSearchActions.setStockData(inputVal));
    setInput('');
    setSubmit(true);
    console.log('SUBMIT FORM')
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
              <span className='index-quote'>DJIA { }</span>
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