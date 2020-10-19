import React, { Component } from "react";
import styled from "styled-components";
import { Spinner, Button } from "reactstrap";
import ErrorMsg from "../errors/errors";

const Div = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom; 40px;
align-items: center;
h4 {
    text-align: center;
    margin-bottom: 20px;
}
`;

const Field = ({ item, field, lable }) => {
  // item тут это обьект нашего выбора из API, который мы получаем через id
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="font-weight-bold"> {lable} </span>
      <span> {item[field]} </span>
    </li>
  );
  // В спан с item[field] мы подставляем в обьект с данными персонажа и ищем по соответствующему ключу данные, которые выводим
};

export { Field };

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      loading: false,
      error: false,
    };
  }

  updateChar() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId).then(this.onLoading);
  }
  // чтобы не запутаться мы создали новую функцию  onLoading
  onLoading = (item) => {
    this.setState({
      item: item,
      loading: false,
    });
  };

  componentDidCatch() {
    this.setState({
      error: true,
      item: null,
    });
  }
  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({
        loading: true,
      });
      this.updateChar();
    }
  }

  render() {
    if (!this.state.item && this.state.error) {
      return <ErrorMsg />;
    } else if (!this.state.item) {
      return (
        <span className="font-weight-bold" style={{ color: "white" }}>
          Please, select a character
        </span>
      );
    }
    const { loading, item } = this.state;
    const { name } = item;
    if (loading) {
      return (
        <Div>
          <Button style={{ color: "blue" }} disabled>
            <Spinner as="span" animation="grow" size="lg" />
          </Button>
        </Div>
      );
    }
    return (
      <Div>
        <h4 style={{ color: "red" }}> {name} </h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
            //создаем копию каждого child
          })}
        </ul>
      </Div>
    );
  }
}
