import React from "react";
import { Link } from "react-router-dom";

// ant design componenet call
import styled from "styled-components";
import { Row, Menu } from "antd";
import { IoManOutline, IoWomanOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { GiRunningShoe, GiWinterHat, GiAchievement } from "react-icons/gi";

const NavBar = () => {
  return (
    <>
      <StyledRow>
        <StyledMenu theme="dark" mode="horizontal" defaultSelectedKeys={["4"]}>
          <StyledMenu.Item key="dashboard" icon={<RiUserSettingsLine />}>
            <Link to="/dashboard">Dashboard</Link>
          </StyledMenu.Item>
          <StyledMenu.Item key="man" icon={<IoManOutline />}>
            <Link to="/man">Man</Link>
          </StyledMenu.Item>
          <StyledMenu.Item key="womenn" icon={<IoWomanOutline />}>
            <Link to="/women">Women</Link>
          </StyledMenu.Item>
          <StyledMenu.Item key="shoes" icon={<GiRunningShoe />}>
            <Link to="/shoes">Shoes</Link>
          </StyledMenu.Item>

          <StyledMenu.Item key="hats" icon={<GiWinterHat />}>
            <Link to="/hats">Hats</Link>
          </StyledMenu.Item>
          <StyledMenu.Item key="accessories" icon={<GiAchievement />}>
            <Link to="/accessories">Accessories</Link>
          </StyledMenu.Item>
        </StyledMenu>
      </StyledRow>
    </>
  );
};

export default NavBar;

const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  background-color: var(--neut-black);
`;

const StyledMenu = styled(Menu)`
  width: 100%;
  text-align: center;
  background-color: var(--neut-black) !important;
`;
