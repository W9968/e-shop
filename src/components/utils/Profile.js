import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// ant design component call
import styled from "styled-components";
import { Row, Col, Avatar, message } from "antd";
import { BsViewList, BsPencil, BsPower } from "react-icons/bs";

const Profile = () => {
  const history = useHistory();
  const { logout } = useAuth();

  const handlerLogout = async () => {
    try {
      await logout();
      history.push("/login");
      message.info("You logget out from your account", 2.5);
    } catch {
      message.error("Something went Wrong try again ..", 2.5);
    }
  };

  return (
    <>
      <Wrapper>
        <Container span={12}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <p style={{ color: "white" }}>HELLO</p>
        </Container>
        <Container className="divider" span={12}>
          <Linker to="/lists">
            <BsViewList />
          </Linker>
          <Linker to="/update-profile">
            <BsPencil />
          </Linker>
          <Linker to="">
            <BsPower onClick={handlerLogout} />
          </Linker>
        </Container>
      </Wrapper>
    </>
  );
};

export default Profile;

const Wrapper = styled(Row)`
  border-top: 1px solid var(--neut-white);
  background-color: var(--neut-black);

  .divider {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const Container = styled(Col)`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Linker = styled(Link)`
  display: flex;
  font-size: 1rem;
  margin: 0rem 1rem;
  color: var(--neut-white);
`;
