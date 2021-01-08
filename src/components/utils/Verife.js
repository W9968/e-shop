import React from "react";
import { useHistory } from "react-router-dom";
import { destroy } from "cart-localstorage";

import { message, Row, Button } from "antd";
import styled from "styled-components";

const Verife = () => {
  const history = useHistory();

  const handleDestroy = () => {
    message.loading("Working...");
    destroy();
    history.push("/checkout");
    message.success("Cart deleted");
  };

  const handleRefuse = () => {
    history.push("/checkout");
  };

  return (
    <>
      <Div>
        <Text>are you sure you want you delete your cart ?</Text>
        <Row>
          <StyledButton type="danger" onClick={handleDestroy}>
            Yes
          </StyledButton>
          <StyledButton type="primary" onClick={handleRefuse}>
            No
          </StyledButton>
        </Row>
      </Div>
    </>
  );
};

export default Verife;

const Div = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.h2`
  padding: 10px;
  font-weight: 600;
  margin: 0rem auto;
  letter-spacing: 1px;
  color: var(--neut-black);
  text-transform: capitalize;
`;

const StyledButton = styled(Button)`
  margin: 1rem 1rem;
`;
