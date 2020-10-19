import React, { Component } from "react";
import { Row } from "reactstrap";
import RowBlock from "../rowBlock/rowBlock";
import ItemList from "../itemList/itemlist_old";
import ItemDetails, { Field } from "../itemDetails/itemDetails";
import ErrorMsg from "../errors/errors";
import gotService from "../../services/gotService";

export default class CharacterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHouse: 1,
      error: false,
    };
  }
  gotService = new gotService();

  onItemSelected = (id) => {
    this.setState({
      selectedHouse: id,
    });
  };

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
    const itemLists = (
      <ItemList
        getData={this.gotService.getAllHouses}
        onItemSelected={this.onItemSelected}
        renderItem={({ name }) => `${name}`}
      />
    );
    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotService.getHouses}
      >
        <Field field="name" lable="Name" />
        <Field field="region" lable="Region" />
        <Field field="words" lable="Words" />
        <Field field="titles" lable="Titles" />
        <Field field="overlord" lable="Overlord" />
        <Field field="ancestralWeapons" lable="Ancestral weapons" />
      </ItemDetails>
    );

    return <RowBlock left={itemLists} right={itemDetails} />;
  }
}
