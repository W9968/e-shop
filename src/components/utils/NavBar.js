import React, { useState, useEffect } from "react";

// ant design componenet call
import styled from "styled-components";
import { Row, Menu } from "antd";
import { IoManOutline, IoWomanOutline } from "react-icons/io5";
import { GiRunningShoe, GiWinterHat, GiAchievement } from "react-icons/gi";

const NavBar = () => {
  return (
    <>
      <StyledRow>
        <StyledMenu theme="dark" mode="horizontal" defaultSelectedKeys={["4"]}>
          <StyledMenu.Item key="man" icon={<IoManOutline />}>
            Man
          </StyledMenu.Item>
          <StyledMenu.Item key="womenn" icon={<IoWomanOutline />}>
            Women
          </StyledMenu.Item>
          <StyledMenu.Item key="shoes" icon={<GiRunningShoe />}>
            Shoes
          </StyledMenu.Item>

          <StyledMenu.Item key="hats" icon={<GiWinterHat />}>
            Hats
          </StyledMenu.Item>
          <StyledMenu.Item key="accessories" icon={<GiWinterHat />}>
            Accessories
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
