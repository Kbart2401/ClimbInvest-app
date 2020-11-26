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

  //Redirect to stock info page once search input is submitted
  useEffect(() => {
    if (isSubmitted) {
      setSubmit(false)
      return () => history.push('/stock-info')
    }
  }, [isSubmitted])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(stockSearchActions.setCompanyInfo(inputVal));
    dispatch(stockSearchActions.setStockData(inputVal));
    setInput('');
    setSubmit(true);
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
                <div className='search-field'>
                  <i class="fa fa-search icon">
                  </i>
                  <input className='search-input' autoComplete='off' type='text' name='search' placeholder='Quote Search'
                    onChange={handleChange} />
                </div>
              </form>
            </div>
          </div>
        </>}
    </>
  )
}

export default Footer;