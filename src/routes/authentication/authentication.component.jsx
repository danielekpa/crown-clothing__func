import React, {Fragment, useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.id === "signup") {
      const {id} = location.state;
      navigate("sign-up", {state: {id: id}});
      return;
    }
    navigate("sign-in");
  }, [navigate]);

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}

export default Authentication;
