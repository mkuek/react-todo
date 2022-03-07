import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./editTodo";
import CompleteTodo from "./completeTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const detleteTodo = await fetch(`http://localhost:5050/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5050/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  useEffect(() => {
    setIncompleteTodos(todos.filter((todo) => todo.is_completed !== true));
    setCompleteTodos(todos.filter((todo) => todo.is_completed == true));
  }, [todos]);

  return (
    <Fragment>
      <div className="col-6 offset-3">
        {incompleteTodos.length > 0 ? (
          <table className="table table-striped mt-5 text-center">
            <thead className="table-dark">
              <tr>
                <td colSpan="4">Incomplete Tasks</td>
              </tr>
            </thead>
            <tbody>
              {incompleteTodos.map((todo, index) => {
                return (
                  <tr key={todo.todo_id}>
                    <td className="text-center align-middle">
                      {todo.is_completed == false ? todo.description : ""}
                    </td>
                    <td>
                      <CompleteTodo todo={todo} />
                    </td>
                    <td>
                      <EditTodo todo={todo} />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.todo_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
        {completeTodos.length > 0 ? (
          <table className="table table-striped mt-5 text-center">
            <thead className="table-dark">
              <tr>
                <td colSpan="4">Complete Tasks</td>
              </tr>
            </thead>
            <tbody>
              {completeTodos.map((todo, index) => {
                return (
                  <tr key={todo.todo_id}>
                    <td className="text-center align-middle">
                      {todo.is_completed == true ? todo.description : ""}
                    </td>
                    <td>
                      <CompleteTodo todo={todo} />
                    </td>
                    <td>
                      <EditTodo todo={todo} />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.todo_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default ListTodos;
