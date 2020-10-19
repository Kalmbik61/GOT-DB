import React from "react";
import { Col, Row } from "reactstrap";

const RowBlock = ({ left, right }) => {
  // получаем в пропсы этого компонента обьект, поэтому можем его деструктуировать
  return (
    <Row>
      <Col md="6">{left}</Col>
      <Col md="6">{right}</Col>
    </Row>
  );
};

export default RowBlock;
