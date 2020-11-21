import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './navigation.css';

const Navigation = () => {
const sessionUser = useSelector(state => state.session.user)
const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(sessionActions.logOutUser());
  }
  return (
    <>
    <h1 className='header-title'>Morgan Stanley</h1>
    <ul>
      {!sessionUser &&
      <>
      <NavLink to='/login'>Login</NavLink>
      </>}
      {sessionUser &&
      <>
      <NavLink to='/'>Home</NavLink>
      <button onClick={handleLogOut}>Log out</button>
      </>}
    </ul>
    </>
  )
}

export default Navigation;