import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useFireStore } from "../auth/Firebase";

// ant design component call
import styled from "styled-components";
import { Row, Col, Avatar, message } from "antd";
import { BsPencil, BsPower } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

const Profile = () => {
  // hooks
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [socket, setSocket] = useState({});

  // log out
  const handlerLogout = async () => {
    try {
      await logout();
      history.push("/login");
      message.info("You logget out from your account", 2.5);
    } catch {
      message.error("Something went Wrong try again ..", 2.5);
    }
  };

  // pull bucket account
  const DisplayProfile = async () => {
    const docs = useFireStore
      .collection("account-bucket")
      .doc(`${currentUser.uid}`);
    const docsRef = await docs.get();
    setSocket(docsRef.data());
  };

  useEffect(() => {
    return DisplayProfile();
  });

  return (
    <>
      <Wrapper>
        <Container span={12}>
          <Avatar src={socket.avatar} />
          <Text>{socket.storename}</Text>
        </Container>
        <Container className="divider" span={12}>
          <Linker to="/listening">
            <AiOutlineAppstoreAdd />
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

/* Style */

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

const Text = styled.h3`
  margin: 0rem 0.5rem;
  color: var(--neut-white);
`;

const Linker = styled(Link)`
  display: flex;
  font-size: 1rem;
  margin: 0rem 1rem;
  color: var(--neut-white);
  transition: 0.3s ease-in-out;

  &:hover {
    font-size: 1.5rem;
  }
`;
