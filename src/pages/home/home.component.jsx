import React from "react";

import Header from "../../components/header/header.component";
import TodoArea from "../../components/todo-area/todo-area.component";

import Aux from "../../components/hoc/auxiliary.component";

const HomePage = () => (
  <Aux>
    <Header />
      <TodoArea />
  </Aux>
);

export default HomePage;
