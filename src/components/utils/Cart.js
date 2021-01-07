import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { list } from "cart-localstorage";

// ant design component
import styled, { keyframes, Keyframes } from "styled-components";
import { Badge } from "antd";
import { FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  const [cart, setCart] = useState();

  const updateCart = async () => {
    return await setCart(list().length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateCart();
    }, 10);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <StyledBadge count={cart}>
        <Linker to="">
          <FiShoppingCart className="head-example" />
        </Linker>
      </StyledBadge>
    </>
  );
};

export default Cart;

const StyledBadge = styled(Badge)`
  position: fixed;
  top: 95%;
  left: 95%;
  mix-blend-mode: difference;
  transform: translate(-95%, -95%);
`;

const Jumper = keyframes`
  
  0% {
    padding: 10px 13px 10px 10px;
  }
  30% {
    padding: 13px 16px 13px 13px;
  }

  60% {
    padding: 11px 14px 11px 11px;
  }

  100% {
    padding: 13px 16px 13px 13px;
  }
`;

const Linker = styled(Link)`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  padding: 10px 13px 10px 10px;
  color: var(--dust-red);
  background-color: var(--neut-black);

  &:hover {
    animation: ${Jumper} 1s forwards;
  }
`;
