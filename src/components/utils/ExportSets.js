import React, { useEffect, useState } from "react";
import { useFireStore } from "../auth/Firebase";
import { add, exists, quantity } from "cart-localstorage";

// ant design componenet
import styled from "styled-components";
import { Row, Card } from "antd";
import { MdAddShoppingCart } from "react-icons/md";

const ExportSets = ({ coll }) => {
  const [sockets, setSockets] = useState([]);

  useEffect(() => {
    const pullData = async () => {
      return await useFireStore
        .collection("bucket")
        .doc("items")
        .collection(`${coll}`)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSockets(data);
        });
    };

    // we use pull effect to ovoid memory leak
    pullData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Wrapper>
        <StyledRow>
          <Text>for {coll}</Text>
        </StyledRow>
        <Container>
          {sockets.map((socket, index) => {
            return (
              <StyledCard
                key={index}
                size="small"
                style={{ width: "300px" }}
                title={socket.title}
                extra={
                  <Ficon
                    onClick={async () => {
                      if (exists({ index }) === true) {
                        quantity(index, 1);
                      }
                      await add({
                        id: `${socket.id}` + 1,
                        name: `${socket.title}`,
                        price: parseInt(socket.price),
                      });
                    }}
                  />
                }
              >
                <img
                  alt={socket.title}
                  className="preview"
                  src={socket.avatar}
                />
                <p>{socket.price}.000 dtn</p>
                <p>{socket.infos}</p>
              </StyledCard>
            );
          })}
        </Container>
      </Wrapper>
    </>
  );
};

export default ExportSets;

/* Stymes */

const Wrapper = styled.div`
  max-width: 100%;
  min-height: 70vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--neut-gray);
`;

const StyledRow = styled(Row)`
  margin: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Text = styled.h1`
  margin: 1rem 0.5rem;
  color: var(--neut-black);
  text-transform: capitalize;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0rem;
`;

const StyledCard = styled(Card)`
  margin: 1rem;
  height: 100%;

  .preview {
    width: 100%;
    height: 250px;
  }
`;

const Ficon = styled(MdAddShoppingCart)`
  cursor: pointer;
  font-size: 25px;
  margin: 1rem 0.5rem;
  color: var(--pola-cyan);
  transition: 0.3s ease-in-out;

  &:hover {
    font-size: 30px;
  }
`;
