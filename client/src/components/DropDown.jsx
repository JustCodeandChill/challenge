import React from "react";
import { Container, Dropdown } from "react-bootstrap";

export default function DropDown({ data, setItem, name, variant }) {
  const handleOnClick = (e) => {
    let textValue = e.target.innerText;
    if (textValue === name) {
      return;
    }
    setItem(textValue);
  };

  return (
    <Dropdown onClick={handleOnClick}>
      <Dropdown.Toggle variant={variant} id="dropdown-basic">
        {name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {data &&
          data.map((item) => <Dropdown.Item key={item}>{item}</Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
  );
}
