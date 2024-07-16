import React, { useState } from "react";
import GenericModal from "./modal";
import ChangeUser from "./addOrChangeUser";

const Table = ({ users, onUpdate, onDelete, setUsers }) => {
  const [updateShown, setUpdateShown] = useState(false);
  const [deleteShown, setDeleteShown] = useState(false);

  const toggleUpdateModal = () => setUpdateShown((prev) => !prev);
  const toggleDeleteModal = () => setDeleteShown((prev) => !prev);

  const onSort = async () => {
    const res = await fetch("http://localhost:3000/sort", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });
    const sortedUsers = await res.json();
    setUsers(sortedUsers);
  };

  return (
    <div>
      <button onClick={onSort}>Sort by Salary</button>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date Started</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.dateStarted}</td>
              <td>{user.role}</td>
              <td>{user.salary}</td>
              <td>{user.manager}</td>
              <td>
                <button onClick={toggleUpdateModal}>Edit</button>
                <GenericModal
                  displayModal={updateShown}
                  closeModal={toggleUpdateModal}
                >
                  <ChangeUser onSubmit={onUpdate} user={user}></ChangeUser>
                </GenericModal>
                <button onClick={toggleDeleteModal}>Delete</button>
                <GenericModal
                  displayModal={deleteShown}
                  closeModal={toggleDeleteModal}
                >
                  <button
                    onClick={() => {
                      onDelete(user._id);
                      toggleDeleteModal();
                    }}
                  >
                    Confirm
                  </button>
                </GenericModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
