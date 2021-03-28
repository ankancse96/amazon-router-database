import React from 'react';
import { useContext } from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../App';


const PrivateRoute = ({children,...rest}) => {
    const[loggedInUser,setLoggedInUser] = useContext(UserContext);
    console.log(setLoggedInUser)
    return (
        <Route
      {...rest}
      render={({ location }) =>
      loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;