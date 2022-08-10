import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/authentication/sign-in/sign-in.component";
import SignUp from "./routes/authentication/sign-up/sign-up.component";
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route
            path="/auth"
            // element={<Navigate to={`${location.pathname}sign-in`} replace />}
            element={<Authentication />}
          >
            <Route path={`sign-in`} element={<SignIn />} />
            <Route path={`sign-up`} element={<SignUp />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
