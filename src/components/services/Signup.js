import React, { useRef, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useHistory } from "react-router-dom";

// ant design component call
import styled from "styled-components";
import { Row, message } from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";

const Signup = () => {
  document.title = "HANOUTI | Sign Up";

  // get input value
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSumbit = async (e) => {
    // prevent all default exeptions
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return message.error("Password do not match");
    }

    try {
      setLoading(true);
      message.loading("action in progress..", 2.5);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/shop-details");
      message.success("Loading finished", 2.5);
    } catch {
      message.error("Faild to creat account");
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSumbit}>
          <StyledRow>
            <Text>sign up</Text>
            <Ficon />
          </StyledRow>
          <InputGroup>
            <Label>e-mail</Label>
            <StyledInput
              required
              ref={emailRef}
              placeholder="E-mail"
              type="email"
              size="large"
            />
          </InputGroup>
          <InputGroup>
            <Label>password</Label>
            <StyledInput
              required
              ref={passwordRef}
              placeholder="Password"
              type="password"
              size="large"
            />
          </InputGroup>

          <InputGroup>
            <Label>password</Label>
            <StyledInput
              required
              ref={passwordConfirmRef}
              placeholder="Confirm Password"
              type="password"
              size="large"
            />
          </InputGroup>

          <InputGroup>
            <Row>
              <StyledButton disabled={loading} type="submit">
                Create Account
              </StyledButton>
            </Row>
          </InputGroup>

          <InputGroup>
            <p>
              Already have an account ?<Link to="/login">...login!</Link>{" "}
            </p>
          </InputGroup>
        </Form>
      </Wrapper>
    </>
  );
};

export default Signup;

/* styles */
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

const Ficon = styled(AiOutlineUserAdd)`
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
