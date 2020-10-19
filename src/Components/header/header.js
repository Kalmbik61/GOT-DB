import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const HeaderTitle = styled.h3`
  font-size: 26px;
  color: #fff;
  margin: 0;
`;

const HeaderList = styled.ul`
  display: flex;
  margin: 0;
  align-items: center;
  color: #fff;
  list-style-type: none;
  li {
    margin-right: 20px;
    font-size: 18px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <Link to="/">Game of Thrones DB</Link>
      </HeaderTitle>
      <HeaderList>
        <li>
          <Link to="/characters/">Characters</Link>
        </li>
        <li>
          <Link to="/Houses/">Houses</Link>
        </li>
        <li>
          <Link to="/Books/">Books</Link>
        </li>
      </HeaderList>
    </HeaderContainer>
  );
};

export default Header;
