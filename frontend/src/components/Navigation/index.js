import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
      <div className='nav-title-container'>
        <h1 className='header-title'>Morgan Stanley</h1>
      </div>
      <ul>
        {sessionUser &&
          <>
            <div className='nav-bar'>
              <NavLink to='/'>Home</NavLink>
              <button onClick={handleLogOut}>Log out</button>
            </div>
          </>}
      </ul>
    </>
  )
}

export default Navigation;