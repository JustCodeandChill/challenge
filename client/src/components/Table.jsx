import React from "react";
import { Table } from "react-bootstrap";

export default function CustomTable({ header, data, option, styles }) {
  const getTableHead = () => {
    return (
      <thead>
        <tr>
          {header.map((value) => (
            <th key={header + Math.random() * 1234}>{value}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const getTableBody = () => {

    switch (option) {
      case "username-age":
        return getTableBodyNested();
      case "age-count":
        return getTableBodySimple();
      default:
        return null;
    }
  };

  const getTableBodyNested = () => {
    return (
      <tbody>
        {data.map((row) => {
          let values = Object.values(row);
          // TO_DO: generate true unique value
          return (
            <tr key={Math.random() * 12345}>
              {values.map((value) => (
                <td key={Math.random() * 12345}>{value}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const getTableBodySimple = () => {
    return (
      <tbody>
        {data.map((row) => {
          let key = Object.keys(row);
          let value = row[key];

          // TO_DO: generate true unique value
          return (
            <tr key={Math.random() * 12345}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const getTable = () => {
    if (!data || !header) return null;

    return (
      <Table bordered hover className="mt-2">
        {header && getTableHead()}
        {data && getTableBody()}
      </Table>
    );
  };

  return getTable();
}
