import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './footer.css';
import * as stockSearchActions from '../../store/stockSearch';
import { useHistory } from 'react-router-dom';
import { AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai';
import { FaAngellist } from 'react-icons/fa';

const Footer = () => {
  const sessionUser = useSelector(state => state.session.user)
  const indexes = useSelector(state => state.session.indexes)
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
        <div className='footer-container__no-user'>
          <div className='footer-left'>
            <h1>ABOUT</h1>
            <div>Created by Kyle Barthelmes</div>
            <div>
              <a href='https://github.com/Kbart2401' target='_blank' rel='noreferrer'><AiOutlineGithub size='30px' /></a>
              <a href='https://kbart2401.github.io/' target='_blank' rel='noreferrer'><AiFillLinkedin size='30px' /></a>
              <a href='https://angel.co/u/kyle-barthelmes' target='_blank' rel='noreferrer'><FaAngellist size='30px' /></a>
            </div>
          </div>
          <div className='footer-middle'>
            <h1>CONTACT</h1>
            <div>Kbart2401@gmail.com</div>
          </div>
          <div className='footer-right'>
            <h1>MORE</h1>
            <div style={{ marginBottom: '13px' }}>
              <a href='https://kbart2401.github.io/' target='_blank' rel='noreferrer'>Portfolio</a>
            </div>
            <div>
              Inspired by <a href='https://login.morganstanleyclientserv.com/ux/' target='_blank' rel='noreferrer'>Morgan Stanley Online</a>
            </div>
          </div>
        </div>}
      {sessionUser &&
        <>
          <div className='footer-container__user'>
            <div className='footer-content'>
              <span>Markets*</span>
              <span className='index-quote'>
                DJIA <span className={indexes?.DIA.quote.changePercent < 0 ? 'red' : 'green'}>
                  {indexes?.DIA.quote.changePercent}</span>
              </span>
              <span className='index-quote'>
                NASDAQ <span className={indexes?.QQQ.quote.changePercent < 0 ? 'red' : 'green'}>
                  {indexes?.QQQ.quote.changePercent}</span>
              </span>
              <span className='index-quote'>
                S&P <span className={indexes?.SPY.quote.changePercent < 0 ? 'red' : 'green'}>
                  {indexes?.SPY.quote.changePercent}</span>
              </span>
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