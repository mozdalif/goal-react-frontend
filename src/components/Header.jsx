import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaSignInAlt, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { logoutThunk } from '../features/auth/authThunk';


function Header() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <Link to='/login'>
              <button className='btn' onClick={() => dispatch(logoutThunk())}>
                <FaSignOutAlt />Logout
              </button>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <button className='btn'>
                  <FaSignInAlt /> Login
                </button>
              </Link>
            </li>
            <li>
              <Link to='/register'><FaUserAlt />Register</Link>
            </li>
          </>
        )}

      </ul>
    </header >
  )
}

export default Header
