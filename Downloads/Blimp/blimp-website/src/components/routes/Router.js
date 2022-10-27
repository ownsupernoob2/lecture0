import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from "../layout/Home";
import ProtectedRoute from "./ProtectedRoute";
import NotProtectedRoute from "./NotProtectedRoute";

const Router = () => {
  return(
    <BrowserRouter>
      <div>
        <div className="mt-5 pt-4 mb-5">
          <Switch>
            {/* <Route path='/login' component={SignIn}/>
            <Route path='/register' component={SignUp}/> */}
            <Route exact path='/' component={Home}/>
          
            <NotProtectedRoute path="*" render = {() => <Redirect to="/" />}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
};

export default Router;