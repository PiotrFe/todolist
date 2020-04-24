import React from "react";

import "./home-page.styles.scss";


import ToDoItems from "../../components/todo-items/todo-items.component";
import ToDoModal from "../../components/todo-new-modal/todo-new-modal";


const HomePage = () => (
  <div className="homepage">
    <div className="homepage__content">
      <ToDoItems />
    </div>
  </div>
);

export default HomePage;
