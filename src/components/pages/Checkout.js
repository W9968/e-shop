import React, { useState } from "react";
import { Link } from "react-router-dom";
import { total, list, quantity } from "cart-localstorage";
import StripeCheckout from "react-stripe-checkout";

// ant design component
import styled from "styled-components";
import { Table, List, Button, Row, Tag } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const Checkout = () => {
  document.title = "HANOUTI | Checkout";
  const { Column } = Table;
  const data = list();

  // eslint-disable-next-line no-unused-vars
  const [a, setQuant] = useState(); // eslint-disable-next-line no-unused-vars
  const [a2, setQuant2] = useState();

  const onToken = (token) => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  return (
    <>
      <Container>
        <Content>
          <List header={<Div>Update quantity of what you buys</Div>} bordered>
            {list().map((cap, key) => {
              return (
                <List.Item key={key}>
                  <StyledRow>
                    <div className="name" span={12}>
                      {cap.name}
                    </div>
                    <div span={12}>
                      <Button
                        size="small"
                        onClick={async () => {
                          await quantity(cap.id, 1);
                          setQuant2(cap.quantity);
                        }}
                      >
                        <PlusOutlined />
                      </Button>

                      <StyledTag color="#108ee9">{cap.quantity}</StyledTag>

                      <Button
                        size="small"
                        onClick={async () => {
                          await quantity(cap.id, -1);
                          setQuant(cap.quantity);
                        }}
                      >
                        <MinusOutlined />
                      </Button>
                    </div>
                  </StyledRow>
                </List.Item>
              );
            })}
          </List>

          <Table dataSource={data}>
            <Column title="#" dataIndex="id" key="id" />
            <Column title="Item Name" dataIndex="name" key="name" />
            <Column title="Price" dataIndex="price" key="price" />
            <Column title="Quantity" dataIndex="quantity" key="quantity" />
          </Table>

          <Row>
            <form>
              <StripeCheckout
                name="Hanouti Inc."
                token={onToken}
                image=""
                description="Clothing brand"
                amount={total() * 100}
                stripeKey="pk_test_51I4STaBEBLmRHvyUdcdkgIxqDtxeyOYj98g5pFAT6LcsyqHaAltGXThT31DrEnl80xojGMtxWSbPwBl2SShkT1LY00qCKkFv3Y"
              />
              <StyledButton
                disabled={total() === 0 ? true : false}
                type="primary"
                htmlType="submit"
              >
                Amount to pay: {total()} dtn{" "}
              </StyledButton>
            </form>

            <StyledButton type="danger">
              <Link to="/verife">Clear List</Link>
            </StyledButton>
          </Row>
        </Content>
      </Container>
    </>
  );
};

export default Checkout;

/* Styles */

const Container = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 90%;
`;

const Div = styled.h3`
  font-weight: 600;
  letter-spacing: 1px;
  background-color: var(--pola-green);
`;

const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .name {
    width: 250px;
    font-size: 1rem;
  }
`;

const StyledTag = styled(Tag)`
  margin: 0;
  font-size: 1rem;
  margin: 0rem 1rem;
`;

const StyledButton = styled(Button)`
  margin: 2rem 1rem;
`;
