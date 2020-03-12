import React from "react";

import TodoArea from "../../components/todo-area/todo-area.component";

import Aux from "../../components/hoc/aux.component";

const HomePage = () => (
  <Aux>
    <TodoArea />
  </Aux>
);

export default HomePage;
