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
      selectedItem: 130,
      error: false,
    };
  }

  gotService = new gotService();

  onItemSelected = (id) => {
    this.setState({
      selectedItem: id,
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
    // разделили компоненты и передаем их как пропсы в 1 новый компонент RowBlock
    const itemLists = (
      <ItemList
        getData={this.gotService.getAllCharacters}
        onItemSelected={this.onItemSelected}
        renderItem={({ name }) => `${name}`}
      />
    );
    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getChar}
      >
        <Field field="gender" lable="Gender" />
        <Field field="born" lable="Born" />
        <Field field="died" lable="Died" />
        <Field field="culture" lable="Culture" />
      </ItemDetails>
    );

    return <RowBlock left={itemLists} right={itemDetails} />;
  }
}
