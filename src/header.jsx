import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.div`
  flex-grow: 1;
  font-weight: bold;
`;

const BackIcon = styled.span`
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

function HeaderBar() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <Header>
      <BackIcon onClick={handleBackClick}>←</BackIcon>
      <Title>Cats</Title>
    </Header>
  );
}

export default HeaderBar;
