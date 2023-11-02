import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Todo from "./Todo";

//create your first component
const Home = () => {
  return (
    <div className="home">
      <h1>Pierre's Todo List</h1>
      <Todo />
    </div>
  );
};

export default Home;
