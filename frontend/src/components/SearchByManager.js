import React, { useState } from "react";

const SearchByManager = ({ onSubmit, toggleSearchManagerModal }) => {
  const [managerName, setManagerName] = useState("");

  const fetchWorkers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search/?manager=${managerName}`
      );
      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleManagerNameChange = (event) => {
    setManagerName(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        toggleSearchManagerModal();
        fetchWorkers();
      }}
    >
      <input
        type="text"
        value={managerName}
        onChange={handleManagerNameChange}
        placeholder="Enter manager name"
      />
    </form>
  );
};

export default SearchByManager;
