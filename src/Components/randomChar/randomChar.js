import React, { Component } from "react";
import { Spinner, Button } from "reactstrap";
// import Spiner from "../spiner/spiner";
// скрыл спинер из урока и использовал из reactstrap

import ErrorMsg from "../errors/errors";
// создаем сообщение с ошибкой

import gotService from "../../services/gotService";
import PropTypes from "prop-types";

import styled from "styled-components";

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

export default class RandomChar extends Component {
  constructor() {
    super();
    this.state = {
      char: {},
      loading: true,
      error: false,
    };
    this.onError = this.onError.bind(this);
    this.onCharLoaded = this.onCharLoaded.bind(this);
    this.updateChar = this.updateChar.bind(this);
  }

  // static defaultProps = {
  //   interval: 5000,
  // };
  // смотри в самый конец

  gotService = new gotService();

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 20);
    // const id = 113131311;
    this.gotService.getChar(id).then(this.onCharLoaded).catch(this.onError);
  };

  // хуки жизненного цикла
  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, this.props.interval);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const {
      char: { name, gender, born, died, culture },
      loading,
      error,
    } = this.state;

    //   Пишем условия о загрузке и возможных ошибках
    if (loading) {
      return (
        <Button style={{ color: "blue" }} disabled>
          <Spinner as="span" animation="grow" size="lg" />
        </Button>
      );
    }
    if (error) {
      return <ErrorMsg />;
    }

    return (
      <Div>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="font-weight-bold"> Gender </span>
            <span> {gender} </span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="font-weight-bold"> Born </span>
            <span>{born} </span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="font-weight-bold"> Died </span>
            <span> {died} </span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="font-weight-bold"> Culture </span>
            <span> {culture} </span>
          </li>
        </ul>
      </Div>
    );
  }
}

RandomChar.defaultProps = {
  interval: 5000,
};
// или написать static внутри компонента
RandomChar.propTypes = {
  // т.к. установлена prop-types можно сделать код меньше

  // interval: (props, propsName, component) => {
  //   const value = props[propsName];

  //   if (typeof value === "number" && !isNaN(value)) {
  //     return null;
  //   }
  //   return new TypeError(`${component} : ${propsName} must be a number`);
  // },

  // вот так
  interval: PropTypes.number,
};
