import React, { useState, useEffect } from "react";

const Todo = () => {
  const API = "https://playground.4geeks.com/apis/fake/todos/user/pierre";
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      newUser();
    }

    if (user) {
      getTasks();
    }
  }, [user]);

  const getTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    console.log(data);
    setTodoList(data);
  };

  const newUser = () => {
    fetch(API, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => setUser(res.statusText));
  };

  const submitTask = async (e) => {
    e.preventDefault();

    if (!todoItem) {
      setError("No task added");

      setTimeout(() => {
        setError("");
      }, 1000);
    }

    if (todoItem) {
      const todo = {
        done: false,
        id: todoList.length + 1,
        label: todoItem,
      };

      try {
        fetch(API, {
          method: "PUT",
          body: JSON.stringify([...todoList, todo]),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
      setTodoList(todoList.concat(todo));
      setTodoItem("");
    }
  };

  const deleteTask = (id) => {
    console.log("trying to delete", id);
    const newList = todoList.filter((item, key) => key !== id);

    try {
      fetch(API, {
        method: "PUT",
        body: JSON.stringify(newList),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }

    setTodoList(newList);
  };

  const clearTasks = () => {
    try {
      fetch(API, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser(null);
      setTodoList([]);
    } catch (error) {
      console.log(error);
    }
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
            {todoList ? (
              todoList.map((item, id) => (
                <li
                  key={id}
                  onMouseOver={() => setActiveItem(id)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {item.label}
                  <span
                    className={`delete ${activeItem === id ? "show" : "hide"}`}
                    onClick={() => deleteTask(id)}
                  >
                    X
                  </span>
                </li>
              ))
            ) : (
              <h1>Nothing</h1>
            )}
          </ul>
        </div>
        <div className="bottom-items">
          <p>{todoList.length} items left</p>
          <button className="clear" onClick={() => clearTasks()}>
            Clear List
          </button>
        </div>
        <div className="stack" />
        <div className="stack2" />
      </div>
    </section>
  );
};

export default Todo;
