import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { axiosInstance } from "./api/axios";
import "./style.css";
import Table from "./components/Table.jsx";
import Dropdown from "./components/DropDown.jsx";

export default function App() {
  /* 
    appropriate data structure 
    [{}, {}, {}] for users and ageAndCount 
    [] for items
    **/

  const [users, setUsers] = useState();
  const [ageAndCount, setAgeAndCount] = useState();
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/users`)
      .then(({ data }) => {
        console.log("user", data);
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
      });

    axiosInstance
      .get(`/items`)
      .then(({ data }) => {
        setItems(data);
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
        setAgeAndCount(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [item]);

  return (
        <div className="app__container bg-white">
      <Container fluid>
        <Row className="mb-5">
          <Col md={{ span: 6, offset: 3 }}>
            <h2>All Users</h2>
            <p>Users and their age</p>
            <Table
              data={users}
              header={["Username", "Age"]}
              option="username-age"
            />
          </Col>
        </Row>
    <hr></hr>
        <Row className="mb-5">
          <Col
            sm={{ span: 6, offset: 2 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            <h2 className="mb-2">Age Demographic User with ___</h2>
            <Dropdown
              data={items}
              setItem={setItem}
              name="item"
              variant="primary"
            />
            <Table
              data={ageAndCount}
              header={["Age", "Count"]}
              option="age-count"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
