import React, { useState } from "react";

const CompleteTodo = ({ todo }) => {
  const [is_completed, setComplete] = useState(todo.is_completed);
  const completeTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5050/todos/${todo.todo_id}/complete`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_completed: !is_completed }),
        }
      );
      setComplete(!is_completed);
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <button className="btn btn-primary" onClick={(e) => completeTask(e)}>
        {!is_completed ? "Complete?" : "Incomplete?"}
      </button>
    </>
  );
};

export default CompleteTodo;
