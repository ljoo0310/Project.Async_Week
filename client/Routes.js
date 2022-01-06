import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthForm from "./components/AuthForm";
import Classrooms from "./components/Classrooms";
import Classroom from './components/Classroom';
import Home from "./components/Home";
import { me } from "./store";

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => { // checks if user is logged in
    dispatch(me());
  }, [])

  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/classrooms" component={Classrooms} />
        <Route path="/classrooms/:id" component={Classroom} />
        <Route path="/login"><AuthForm formName="login" /></Route>
        <Route path="/signup"><AuthForm formName="signup" /></Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  )
}

export default Routes
