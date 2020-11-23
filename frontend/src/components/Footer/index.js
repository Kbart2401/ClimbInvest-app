import {useSelector} from 'react-redux';
import './footer.css';


const Footer = () => {
  const sessionUser = useSelector(state => state.session.user)
  return (
    <>
    {!sessionUser && 
    <div className='footer-container'></div>}
    </>
  )
}

export default Footer;