import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthForm from "./components/AuthForm";
import Classrooms from "./components/Classrooms";
import Home from "./components/Home";
import { me } from "./store";

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
      {!isLoggedIn ? ( // not logged in
        <Switch>
          <Redirect exact from='/' to='/login'/>
          <Route path="/login">
            <AuthForm formName="login" />
          </Route>
          <Route path="/signup">
            <AuthForm formName="signup" />
          </Route>
        </Switch>
      ) : ( // logged in
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/classrooms" component={Classrooms} />
          <Redirect to="/home" />
        </Switch>
      )}
    </div>
  )
}

export default Routes
