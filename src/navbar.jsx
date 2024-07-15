import React from "react";
import styled from "styled-components";

const Footer = styled.div`
  bottom: 0;
  position: fixed;
  width: 300px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  //   border-top: 1px solid #ccc;
  background-color: white;
  border-radius: 10px;
`;

const FooterIcon = styled.a`
  text-decoration: none;
  text-align: center;
`;

const FooterText = styled.a`
  text-decoration: none;
  font-size: 12px;
`;

function Navbar() {
  return (
    <Footer>
      <FooterIcon href="/">
        <div>🏠</div>
        <FooterText>Home</FooterText>
      </FooterIcon>
      <FooterIcon href="/telegram">
        <div>🏆</div>
        <FooterText>Leaderboard</FooterText>
      </FooterIcon>
      <FooterIcon>
        <div>👥</div>
        <FooterText>Friends</FooterText>
      </FooterIcon>
    </Footer>
  );
}

export default Navbar;
