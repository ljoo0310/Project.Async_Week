import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  const { username } = useSelector(state => state.auth);
  return (
    <div>
      {!username
        ? <h3>Welcome to Hoom👋!</h3>
        : <h3>Nice to have you back "{username}" at Hoom👋!</h3>}
      <img alt="welcome" src='../assets/home.jpeg' />
    </div>
  )
}

export default Home
