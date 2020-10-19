import React, { Component } from "react";
import styled from "styled-components";
import { Spinner, Button } from "reactstrap";
import ErrorMsg from "../errors/errors";

import PropTypes from "prop-types";

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

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: null,
      error: false,
    };
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  componentDidMount() {
    const { getData } = this.props;
    // в переменной getData  хранится тот промис, что получаю из пропсов на уровень выше (characterPage)

    getData().then((itemList) => {
      this.setState({
        itemList: itemList,
      });
    });
  }
  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const lable = this.props.renderItem(item);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {lable}
        </li>
      );
    });
  }

  render() {
    const { itemList, error } = this.state;

    if (error) {
      return <ErrorMsg />;
    } else if (!itemList) {
      return (
        <Button style={{ color: "blue" }} disabled>
          <Spinner as="span" animation="grow" size="lg" />
        </Button>
      );
    }
    const items = this.renderItems(itemList);

    return <Ul>{items}</Ul>;
  }
}

// ItemList.defaultProps = {
//   onItemSelected: () => {},
// };

ItemList.propTypes = {
  onItemSelected: PropTypes.func,
};
