import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthStatus } from "../../redux/sign-in-sign-up-page/sign-in-sign-up-page.selectors";
import nav from "../../nav";

const withAuth = (ChildComponent) => {
  const ComposedComponent = ({ authenticated }) => {
    useEffect(() => {
        debugger;
      if (!authenticated) nav("/");
    }, [authenticated]);

    return <ChildComponent />;
  };

  const mapStateToProps = createStructuredSelector({
    authenticated: selectAuthStatus,
  });

  return connect(mapStateToProps)(ComposedComponent);
};

export default withAuth;
