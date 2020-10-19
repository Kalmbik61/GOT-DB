import React, { Component } from "react";
import { Col, Row, Container, ButtonToggle } from "reactstrap";
import Header from "../header/header";
import RandomChar from "../randomChar/randomChar";
import CharacterPage from "../pages/characterPage";
import BooksItem from "../pages/booksItem";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage";
import ErrorMsg from "../errors/errors";
import gotService from "../../services/gotService";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import errorPage from "../404Page/404Page";

import "./app.css";

// продублировали стили , чтобы они при роутинге не потерялись

export default class App extends Component {
  constructor() {
    super();
      this.state = {
      showRandom: true,
      error: false,
    };
    this.onToggleRandom = this.onToggleRandom.bind(this);
  }
  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  gotService = new gotService();

  onToggleRandom() {
    this.setState((state) => {
      return {
        showRandom: !state.showRandom,
      };
    });
  }

  render() {
    const { showRandom } = this.state;
    const randomChar = showRandom ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMsg />;
    }

    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>{randomChar}</Col>
            </Row>
            <ButtonToggle
              onClick={this.onToggleRandom}
              style={{ marginBottom: 40 + "px" }}
              color="primary"
            >
              Toggle Random Character
            </ButtonToggle>
            <Switch>
              <Route
                path="/"
                component={() => (
                  <h1 style={{ color: "white" }}>Welcome to GOT DB</h1>
                )}
                exact
              />
              <Route path="/characters" component={CharacterPage} />
              <Route path="/houses" component={HousesPage} />
              <Route path="/books" exact component={BooksPage} />
              <Route
                path="/books/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  return <BooksItem bookId={id} />;
                }}
              />

              {/* Если такого пути не существует - переходим на страницу ошибки  */}
              <Route path="*/" component={errorPage} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}
