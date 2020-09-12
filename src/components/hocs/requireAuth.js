import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectAuthStatus } from "../../redux/sign-in-sign-up-page/sign-in-sign-up-page.selectors";

const withAuth = (ChildComponent) => {
  const ComposedComponent = ({ authenticated }) => {
    return <>{!authenticated ? <Redirect to="/" /> : <ChildComponent />}</>;
  };

  const mapStateToProps = createStructuredSelector({
    authenticated: selectAuthStatus,
  });

  return connect(mapStateToProps)(ComposedComponent);
};

export default withAuth;
