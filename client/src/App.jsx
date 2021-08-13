import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosInstance } from "./api/axios";
import "./style.css";
import Table from "./components/Table.jsx";
import Dropdown from "./components/DropDown.jsx";

export default function App() {
  const [users, setUsers] = useState();
  const [ageAndCount, setAgeAndCount] = useState();
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/users`)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
      if (item.length === 0) return;

    axiosInstance
      .get(`/users/age?item=${item}`)
      .then(({ data }) => {
        setAgeAndCount([{ ...data }]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [item]);

  return (
    <Container>
      <h2>All Users</h2>
      <p>Users and their age</p>
      <Table data={users} header={["Username", "Age"]} option="nested" />

      <h2>All Users</h2>
      <p>Users and their age</p>
      <Dropdown name="item" variant="primary" />
      <Table data={ageAndCount} header={["Age", "Count"]} option="simple" />
    </Container>
  );
}
