import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddOrChangeUser = ({ user, onSubmit }) => {
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [date, setDate] = useState(user?.date ?? new Date());
  const [role, setRole] = useState(user?.role ?? "Worker");
  const [salary, setSalary] = useState(user?.salary ?? 0);
  const [manager, setManager] = useState(user?.manager ?? "");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handleManagerChange = (e) => {
    setManager(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      _id: user?._id,
      firstName,
      lastName,
      email,
      date,
      role,
      salary,
      manager,
    });
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">First Name:</label>
          <input
            type="text"
            id="name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="name">Last Name:</label>
          <input
            type="text"
            id="name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="role-select">Choose a role:</label>
          <select id="role-select" value={role} onChange={handleRoleChange}>
            <option value="Worker">Worker</option>
            <option value="Driver">Driver</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <div>
          <DatePicker selected={date} onChange={handleDateChange} />
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={handleSalaryChange}
          />
        </div>
        <div>
          <label htmlFor="manager">Manager:</label>
          <input
            type="text"
            id="manager"
            value={manager}
            onChange={handleManagerChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddOrChangeUser;
