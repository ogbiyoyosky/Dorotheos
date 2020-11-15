import React from "react";
import { Route, HashRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Coupon from "../../pages/Coupon";
import ValidateCoupon from "../../pages/ValidateCoupon";

import "./app.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route component={Coupon} path="/" exact />
        <Route component={ValidateCoupon} path="/validate-coupon" exact />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
