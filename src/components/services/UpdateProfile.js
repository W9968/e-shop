import React, { useRef, useState } from "react";

// ant design component call
import styled from "styled-components";
import { Row, Input, Button } from "antd";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const UpdateProfile = () => {
  document.title = "HANOUTI | Update Profile";

  return (
    <>
      <Wrapper>
        <Form>
          <StyledRow>
            <Text>update profile</Text>
            <Ficon />
          </StyledRow>
          <InputGroup>
            <Label>e-mail</Label>
            <StyledInput
              required
              placeholder="E-mail"
              type="email"
              size="large"
              prefix={<AiOutlineMail />}
            />
          </InputGroup>
          <InputGroup>
            <Label>password</Label>
            <StyledInput
              required
              placeholder="Password"
              type="password"
              size="large"
              prefix={<AiOutlineLock />}
            />
          </InputGroup>
          <InputGroup>
            <Row>
              <StyledButton type="submit">Login</StyledButton>
            </Row>
          </InputGroup>
        </Form>
      </Wrapper>
    </>
  );
};

export default UpdateProfile;

/* styles */

const Wrapper = styled.div`
  max-width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: var(--neut-gray);
`;

const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--neut-black);
`;

const Text = styled.h1`
  margin: 1rem 0.5rem;
  color: var(--neut-white);
  text-transform: capitalize;
`;

const Ficon = styled(AiOutlineUser)`
  font-size: 25px;
  margin: 1rem 0.5rem;
  color: var(--neut-white);
`;

const Form = styled.form`
  border: 2px solid var(--neut-black);
`;

const InputGroup = styled.div`
  display: flex;
  margin: 2rem 1rem;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 500px;
  border: none;
  outline: none;
  padding: 12px 15px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Label = styled.label`
  text-align: start;
  font-size: 15px;
`;

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.5rem 2.5rem;
  margin: 0rem auto;
  border-radius: 15px;
  color: var(--neut-white);
  outline: var(--neut-black);
  background-color: var(--neut-black);
  transition: 0.3s ease-in-out;

  &:hover {
    color: var(--neut-black);
    outline: var(--pola-cyan);
    background-color: var(--pola-cyan);
  }
`;
