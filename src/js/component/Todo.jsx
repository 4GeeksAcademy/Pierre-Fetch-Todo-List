import React, { useState } from "react";

// const todoList = [
//     {
//         id: 0,
//         item: 'Code project'
//     },
//     {
//         id: 1,
//         item: 'Read book'
//     }
// ]

const Todo = () => {
  const [todoList, setTodoList] = useState([
    {
      id: 0,
      item: "Code project",
    },
    {
      id: 1,
      item: "Read book",
    },
  ]);
  const [todoItem, setTodoItem] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const [error, setError] = useState("");

  const submitTask = (e) => {
    e.preventDefault();

    if (!todoItem) {
      setError("No task added");

      setTimeout(() => {
        setError("");
      }, 1000);
    }

    if (todoItem) {
      const task = {
        id: todoList.length + 1,
        item: todoItem,
      };
      setTodoList(todoList.concat(task));
      setTodoItem("");
    }
  };

  const deleteTask = (id) => {
    console.log("trying to delete", id);
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  return (
    <section className="todo-container">
      {error && <h1>{error}</h1>}
      <div className="todo">
        <form onSubmit={(e) => submitTask(e)}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
          />
        </form>
        <div className="todo-list">
          <ul>
            {todoList.map((item) => (
              <li
                key={item.id}
                onMouseOver={() => setActiveItem(item.id)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {item.item}
                <span
                  className={`delete ${
                    activeItem === item.id ? "show" : "hide"
                  }`}
                  onClick={() => deleteTask(item.id)}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p>{todoList.length} items left</p>
        <div className="stack" />
        <div className="stack2" />
      </div>
    </section>
  );
};

export default Todo;
