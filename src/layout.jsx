import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import styled from "styled-components";
import HeaderBar from "./header";
const Container = styled.div`
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  width: 300px;
  min-height: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
`;
function Layout() {
  return (
    <Container>
      <HeaderBar />
      <Outlet />
      <Navbar />
    </Container>
  );
}
export default Layout;
