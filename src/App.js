import React from "react";
import "antd/dist/antd.css";
import { Wrapper, GlobalStyle } from "./Theme.global";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./components/utils/NavBar";
import Login from "./components/services/Login";
import Signup from "./components/services/Signup";
import HeroHeader from "./components/utils/HeroHeader";
import UpdateProfile from "./components/services/UpdateProfile";
import ForgotPassword from "./components/services/ForgotPassword";
import EnterShopDetails from "./components/pages/EnterShopDetails";
import Dashboard from "./components/pages/Dashboard";
import CreateListening from "./components/pages/CreateListening";

import AuthProvider from "./components/auth/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Wrapper>
          <Router>
            <HeroHeader name="HANOUTI" />
            <NavBar />
            <Switch>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <ProtectedRoute path="/signup" component={Signup} />
              <ProtectedRoute path="/login" component={Login} />
              <ProtectedRoute
                path="/forgot-password"
                component={ForgotPassword}
              />
              <PrivateRoute path="/listening" component={CreateListening} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/shop-details" component={EnterShopDetails} />
            </Switch>
          </Router>
        </Wrapper>
      </AuthProvider>
    </>
  );
}

export default App;
