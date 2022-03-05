import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./editTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

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

  return (
    <Fragment>
      <div className="col-6 offset-3">
        <table class="table table-striped mt-5 ">
          <tbody>
            {todos.map((todo, index) => {
              return (
                <tr key={todo.todo_id}>
                  <td className="text-center align-middle">
                    {todo.description}
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
      </div>
    </Fragment>
  );
};

export default ListTodos;
