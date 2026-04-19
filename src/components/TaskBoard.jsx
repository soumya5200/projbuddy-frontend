import React, { useState } from "react";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  return (
    <div className="card mt-3">
      <div className="card-header">Task Board</div>

      <div className="card-body">
        <ul className="list-group">
          {tasks.map((t, i) => (
            <li key={i} className="list-group-item">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-3 d-flex">
          <input
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add task"
          />

          <button className="btn btn-success ms-2" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;