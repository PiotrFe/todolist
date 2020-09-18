import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { Alert } from "rsuite";

const ErrorAlert = ({ message }) => {
  let alert;

  useEffect(() => {
    alert = Alert.error(message);
  }, []);

  return <div>{alert}</div>;

};

export default ErrorAlert;
