import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthForm from "./components/AuthForm";
import Classrooms from "./components/Classrooms";
import Classroom from './components/Classroom';
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
          <Route path="/home" component={Home} />
          <Route exact path="/classrooms" component={Classrooms} />
          <Route path="/login"><AuthForm formName="login" /></Route>
          <Route path="/signup"><AuthForm formName="signup" /></Route>
          <Redirect to="/login" />
        </Switch>
      ) : ( // logged in
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/classrooms" component={Classrooms} />
          <Route path="/classrooms/:id" component={Classroom} />
          <Redirect to="/home" />
        </Switch>
      )}
    </div>
  )
}

export default Routes
