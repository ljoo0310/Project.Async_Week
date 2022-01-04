import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import { useSelector, useDispatch } from 'react-redux';

const Routes = () => {
  const { isLoggedIn } = useSelector(state => {
    return {
      isLoggedIn: !!state.auth.id
    }
  })

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, [])

  return (
    <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Redirect exact from='/' to='/login'/>
            <Route path="/login"><AuthForm formName="login" /> </Route>
            <Route path="/signup"><AuthForm formName="signup" /></Route>
          </Switch>
        )}
      </div>
  )
}

export default Routes
