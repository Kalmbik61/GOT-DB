import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner, Button } from "reactstrap";
import ErrorMsg from "../errors/errors";

const Ul = styled.ul`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}
  li {
    cursor: pointer;
  }
`;

function ItemList({ getData, onItemSelected, renderItem }) {
  const [itemList, setUpdList] = useState([]);

  useEffect(() => {
    try {
      getData().then((data) => {
        setUpdList(data);
      });
    } catch (e) {
      return <ErrorMsg />;
    }
  }, []);

  function renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const lable = renderItem(item);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => onItemSelected(id)}
        >
          {lable}
        </li>
      );
    });
  }

  if (!itemList) {
    return (
      <Button style={{ color: "blue" }} disabled>
        <Spinner as="span" animation="grow" size="lg" />
      </Button>
    );
  }

  const items = renderItems(itemList);

  return <Ul>{items}</Ul>;
}
export default ItemList;
