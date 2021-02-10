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
      <div className={`top-title-container ${sessionUser ? 'logged-in' : 'no-user'}`}>
        <div className='nav-title-container'>
          <h1 className='header-title'>ClimbInvest</h1>
          {!sessionUser &&
            <a id='repo-nav-link' href='https://github.com/Kbart2401/ClimbInvest-app' target='_blank' rel='noreferrer'>GitHub Repo</a>}
          {sessionUser &&
            <>
              <p>Welcome {sessionUser.username}</p>
              <NavLink to='/' onClick={handleLogOut}>Log out</NavLink>
            </>}
        </div>
      </div>
      {sessionUser &&
        <>
          <div className='nav-bar'>
            <div className='nav-bar-content'>
              <ul>
                <div className='navLink-container'>
                  <NavLink to='/home'>Home</NavLink>
                  <NavLink to='/trade'>Trade</NavLink>
                </div>
              </ul>
            </div>
          </div>
        </>}
    </>
  )
}

export default Navigation;