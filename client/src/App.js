import React, { Fragment } from "react";
import { ReactDOM } from "react";
import "./App.css";

import InputTodo from "./components/inputTodo";
import ListTodos from "./components/listTodos";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}
export default App;
