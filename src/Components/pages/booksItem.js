import React, { Component } from "react";
import gotService from "../../services/gotService";
import ItemDetails, { Field } from "../itemDetails/itemDetails";

import { Link } from "react-router-dom";

export default class BooksItem extends Component {
  gotService = new gotService();

  render() {
    const style = { display: "flex" };

    return (
      <div className={style}>
        <ItemDetails
          itemId={this.props.bookId}
          getData={this.gotService.getBooks}
        >
          <Field field="numberOfPages" lable="Number Of pages" />
          <Field field="publisher" lable="Publisher" />
          <Field field="released" lable="Released" />
        </ItemDetails>
      </div>
    );
  }
}
