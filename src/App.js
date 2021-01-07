import React from "react";
import "antd/dist/antd.css";
import { Wrapper, GlobalStyle } from "./Theme.global";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Cart from "./components/utils/Cart";
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

import Man from "./components/docs/Man";
import Women from "./components/docs/Women";
import Shoes from "./components/docs/Shoes";
import Hats from "./components/docs/Hats";
import Accessories from "./components/docs/Accessories";
import Index from "./components/pages/Index";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Wrapper>
          <Router>
            <HeroHeader name="HANOUTI" />
            <NavBar />
            <Cart />
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

              {/* simple routes */}

              <Route exact path="/" component={Index} />
              <Route path="/man" component={Man} />
              <Route path="/women" component={Women} />
              <Route path="/shoes" component={Shoes} />
              <Route path="/hats" component={Hats} />
              <Route path="/accessories" component={Accessories} />

              {/* end */}
            </Switch>
          </Router>
        </Wrapper>
      </AuthProvider>
    </>
  );
}

export default App;
