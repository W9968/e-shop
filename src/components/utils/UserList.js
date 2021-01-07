import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useFireStore } from "../auth/Firebase";

// ant design componenet call
import styled from "styled-components";
import { Row, Card, Alert } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

const UserList = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [sockets, setSockets] = useState([]);

  useEffect(() => {
    const pullBucketData = async () => {
      return await useFireStore
        .collection("Items")
        .doc("articles")
        .collection(`${currentUser.uid}`)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(data);
          data.length === 0 ? setError("Your Locker is empty") : setError("");
          setSockets(data);
        });
    };

    // we use pull effect to ovoid memory leak

    pullBucketData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Wrapper>
        <StyledRow>
          <Text>list your Items</Text>
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
                    onClick={() => {
                      useFireStore
                        .collection("Items")
                        .doc("articles")
                        .collection(`${currentUser.uid}`)
                        .doc(`${socket.id}`)
                        .delete();
                    }}
                  />
                }
              >
                <img
                  alt={socket.title}
                  className="preview"
                  src={socket.avatar}
                />
                <p>{socket.time}</p>
                <p>{socket.price}.000 dtn</p>
                <p>{socket.infos}</p>
              </StyledCard>
            );
          })}
        </Container>
        <Row>{error && <Alert message={error} type="info" />}</Row>
      </Wrapper>
    </>
  );
};

export default UserList;

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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dust-red);
`;

const Text = styled.h1`
  margin: 1rem 0.5rem;
  color: var(--neut-white);
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
    height: 100%;
  }
`;

const Ficon = styled(AiOutlineDelete)`
  cursor: pointer;
  font-size: 25px;
  margin: 1rem 0.5rem;
  color: var(--dust-red);
  transition: 0.3s ease-in-out;

  &:hover {
    font-size: 30px;
  }
`;
