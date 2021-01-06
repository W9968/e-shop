import React, { useRef, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

// ant design component call
import styled from "styled-components";
import { Row, message } from "antd";
import { AiOutlineUnlock, AiOutlineMail } from "react-icons/ai";

const ForgotPassword = () => {
  document.title = "HANOUTI | Forgot Password";

  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSumbit = async (e) => {
    // prevent all default exeptions
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      message.error("Check your email for instructions");
    } catch {
      message.error("You must enter a valid email");
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSumbit}>
          <StyledRow>
            <Text>reset password</Text>
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
              prefix={<AiOutlineMail />}
            />
          </InputGroup>
          <InputGroup>
            <Row>
              <StyledButton disabled={loading} type="submit">
                Login
              </StyledButton>
            </Row>
          </InputGroup>
          <InputGroup>
            <p>
              go back to log in<Link to="/login">...yalla!</Link>{" "}
            </p>
          </InputGroup>
        </Form>
      </Wrapper>
    </>
  );
};

export default ForgotPassword;

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

const Ficon = styled(AiOutlineUnlock)`
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
