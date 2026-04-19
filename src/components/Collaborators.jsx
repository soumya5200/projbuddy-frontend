import React, { useState } from "react";

const Collaborators = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const addUser = () => {
    if (!name) return;
    setUsers([...users, name]);
    setName("");
  };

  return (
    <div className="card mt-3">
      <div className="card-header">Collaborators</div>

      <div className="card-body">
        <ul className="list-group">
          {users.map((u, i) => (
            <li key={i} className="list-group-item">
              {u}
            </li>
          ))}
        </ul>

        <div className="mt-3 d-flex">
          <input
            className="form-control"
            placeholder="Add collaborator"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="btn btn-primary ms-2" onClick={addUser}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;