import React from "react";

const title = "Hello React";

const App = () => {
  return (
    <>
      <div>{title}</div>
      <form className="input-form">
        <label htmlFor="lname" name="lname" className="label"></label>
        <input type="text" id="lname" name="lname" className="input" placeholder="Enter your name" defaultValue="enter your name"></input>
        <button className="button" type="button">Submit</button>
      </form>
    </>
  );
};

export default App;
