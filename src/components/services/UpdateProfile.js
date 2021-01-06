import React, { useRef, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useHistory } from "react-router-dom";

// ant design component call
import styled from "styled-components";
import { Row, Alert, message } from "antd";
import { AiOutlineSetting } from "react-icons/ai";

const UpdateProfile = () => {
  document.title = "HANOUTI | Update Profile";

  // get input value
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      await promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      await promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard");
        message.success("Info updated");
      })
      .catch(() => {
        message.error("Failed to update your info");
      })
      .finally(() => {
        message.info("update", 2.5);
      });
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSumbit}>
          <StyledRow>
            <Text>update profile</Text>
            <Ficon />
          </StyledRow>
          <InputGroup>
            <Label>E-mail</Label>
            <StyledInput
              required
              type="email"
              placeholder="Email"
              ref={emailRef}
              autoComplete="nope"
              defaultValue={currentUser.email}
            />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <StyledInput
              placeholder="Password"
              ref={passwordRef}
              type="password"
              size="large"
            />
          </InputGroup>

          <InputGroup>
            <Label> Confirm password</Label>
            <StyledInput
              type="password"
              placeholder="leave black to keep password the same"
              ref={passwordConfirmRef}
              autoComplete="nope"
            />
          </InputGroup>

          <InputGroup>
            <p>{error && <Alert message={error} type="error" />}</p>
          </InputGroup>

          <InputGroup>
            <Row>
              <StyledButton type="submit">Update</StyledButton>
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

const Ficon = styled(AiOutlineSetting)`
  font-size: 25px;
  margin: 1rem 0.5rem;
  color: var(--neut-white);
`;

const Form = styled.form`
  border: 2px solid var(--neut-black);
  @media (max-width: 768px) {
    width: 90%;
  }
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
