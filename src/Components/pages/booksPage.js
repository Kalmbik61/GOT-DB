import React, { Component } from "react";
import { Row } from "reactstrap";
import ItemList from "../itemList/itemlist_old";
import ErrorMsg from "../errors/errors";
import gotService from "../../services/gotService";
import { withRouter } from "react-router-dom";

class BooksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  gotService = new gotService();

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Row>
          <ErrorMsg />
        </Row>
      );
    }
    return (
      <ItemList
        getData={this.gotService.getAllBooks}
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        renderItem={({ name }) => `${name}`}
      />
    );
  }
}

export default withRouter(BooksPage);
