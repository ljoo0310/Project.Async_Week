import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Navbar = () => {
  const { isLoggedIn } = useSelector(state => ({
    isLoggedIn: !!state.auth.id
  }));

  const dispatch = useDispatch();

  return (
    <div id="navbar">
      <h1>Hoom👋, Zoom with Hand Gestures!</h1>
      <nav>
        {!isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <Link to="/classrooms">Classrooms</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        ) : (
          <div>
            <Link to="/home">Home</Link>
            <Link to="/classrooms">Classrooms</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
