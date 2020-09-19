import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectErrors } from "../../redux/error-alert/error-alert.selectors";
import { Alert } from "rsuite";
import { clearAlert } from "../../redux/error-alert/error-alert.actions";

const ErrorAlertList = ({ errors, clearAlert }) => {
  useEffect(() => {
    Object.entries(errors).forEach(([key, { error, logout }]) => {
      Alert.error(error, 0, () => clearAlert(key));
    });
  }, [JSON.stringify(errors)]);

  return <div className="error-alert-list"></div>;
};

const mapStateToProps = createStructuredSelector({
  errors: selectErrors,
});

const mapDispatchToProps = (dispatch) => ({
  clearAlert: (id) => dispatch(clearAlert(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlertList);
