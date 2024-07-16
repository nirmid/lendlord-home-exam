import React, { useEffect, useState } from "react";

import "./App.css";
import GenericModal from "./components/modal";
import Header from "./components/header";
import AddUser from "./components/addOrChangeUser";
import SearchByManager from "./components/SearchByManager";
import Table from "./components/table";

function App() {
  const [addUserShown, setUserShown] = useState(false);
  const [searchManagerShown, setSearchManagerShown] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleAddUserModal = () => setUserShown((prev) => !prev);
  const toggleSearchManagerModal = () => setSearchManagerShown((prev) => !prev);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    const res = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    toggleAddUserModal();
  };

  const updateUser = async (user) => {
    const res = await fetch(`http://localhost:3000/user/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const updatedUser = await res.json();
    const newUsers = users.map((u) => (u._id === user._id ? updatedUser : u));
    setUsers(newUsers);
  };

  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
    });
    if (res.status.toString().startsWith("2")) {
      const newUsers = users.filter((u) => u._id !== id);
      setUsers(newUsers);
    }
  };

  return (
    <div className="App">
      <Header />
      <div id="content">
        <button onClick={toggleAddUserModal}>Add User</button>
        <GenericModal
          displayModal={addUserShown}
          closeModal={toggleAddUserModal}
        >
          <AddUser onSubmit={addUser} user={null}>
            {" "}
          </AddUser>
        </GenericModal>
        <button onClick={toggleSearchManagerModal}>Search Manager</button>
        <GenericModal
          displayModal={searchManagerShown}
          closeModal={toggleSearchManagerModal}
        >
          <SearchByManager
            onSubmit={setUsers}
            toggleSearchManagerModal={toggleSearchManagerModal}
          />
        </GenericModal>
      </div>

      <div>
        <Table
          users={users}
          onUpdate={updateUser}
          onDelete={deleteUser}
          setUsers={setUsers}
        />
      </div>
    </div>
  );
}

export default App;
