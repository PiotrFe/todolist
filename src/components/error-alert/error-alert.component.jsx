import React, { useEffect, useState } from "react";
import { Alert } from "rsuite";

const ErrorAlert = ({ message }) => {
  const [alert, updateAlert] = useState(null);

  useEffect(() => {
    updateAlert(Alert.error(message));
  }, []);

  return <div>{alert}</div>;
  // return <div>This used to be a problem</div>
};

export default ErrorAlert;
