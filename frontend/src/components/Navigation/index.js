import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as sessionActions from '../../store/session';
const Navigation = () => {
const sessionUser = useSelector(state => state.session.user)
const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(sessionActions.logOutUser());
  }
  return (
    <ul>
      {!sessionUser &&
      <>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='signup'>Sign Up</NavLink>
      </>}
      {sessionUser &&
      <>
      <NavLink to='/'>Home</NavLink>
      <button onClick={handleLogOut}>Log out</button>
      </>}
    </ul>
  )
}

export default Navigation;