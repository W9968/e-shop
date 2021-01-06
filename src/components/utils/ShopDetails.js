import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useFireStore, useFireStorage } from "../auth/Firebase";

// ant design componenet call
import styled from "styled-components";
import { Upload, message, Button, Row, Switch, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AiOutlineUnorderedList } from "react-icons/ai";

const ShopDetails = () => {
  //hooks
  const [imgUrl, setImgUrl] = useState();
  const [error, setError] = useState("");

  const history = useHistory();
  const { currentUser } = useAuth();
  const storeName = useRef();
  const localAdress = useRef();
  const town = useRef();
  const phoneNumber = useRef();
  const zipNumber = useRef();

  // files upload

  const loadFile = async (fileName) => {
    const user = `storephoto/${currentUser.uid}`;
    const StorageRef = useFireStorage.ref();
    const fileRef = StorageRef.child(user + "/" + fileName);
    await fileRef.put(fileName).then(() => {
      console.log("file loaded");
    });
    setImgUrl(await fileRef.getDownloadURL());
  };

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        console.log(info.file.name);
        loadFile(info.file.name);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // save information
  const SendBucked = async (event) => {
    event.preventDefault();

    if (
      zipNumber.current.value === "" ||
      isNaN(parseInt(zipNumber.current.value)) ||
      isNaN(parseInt(phoneNumber.current.value))
    ) {
      setError("Insert a Correct phone number");
    } else {
      setError("");

      try {
        message.loading("action in progress..", 2.5);

        await useFireStore
          .collection("account-bucket")
          .doc(`${currentUser.uid}`)
          .set({
            storename: storeName.current.value,
            address: localAdress.current.value,
            city: town.current.value,
            phoneNumber: parseInt(phoneNumber.current.value),
            zipCode: parseInt(zipNumber.current.value),
            avatar: imgUrl,
          });

        setError("");

        history.push("/listening");
        message.success("Saved successfully", 2.5);
      } catch {
        message.error("Something went wrong you may check your connection");
      }
    }
  };

  return (
    <>
      <Wrapper>
        <StyledRow>
          <Text>Your Shop Details</Text>
          <Ficon />
        </StyledRow>
        <Form onSubmit={SendBucked}>
          <InputGroup>
            <Label>Store Name</Label>
            <StyledInput
              required
              ref={storeName}
              placeholder="Store Name"
              type="text"
              size="large"
              autoComplete="nope"
            />
          </InputGroup>

          <InputGroup>
            <Label>Street</Label>
            <StyledInput
              required
              ref={localAdress}
              placeholder="Local Adress"
              type="text"
              size="large"
              autoComplete="nope"
            />
          </InputGroup>

          <InputGroup>
            <Label>Town</Label>
            <StyledInput
              required
              ref={town}
              placeholder="Town"
              type="text"
              size="large"
              autoComplete="nope"
            />
          </InputGroup>

          <InputGroup>
            <Label>ZIP code</Label>
            <StyledInput
              required
              type="text"
              maxLength="4"
              ref={zipNumber}
              placeholder="ZIP code"
              autoComplete="nope"
            />
          </InputGroup>

          <p>{error && <Alert message={error} type="error" />}</p>

          <InputGroup>
            <Label>Number</Label>
            <StyledInput
              required
              type="text"
              minLength="8"
              ref={phoneNumber}
              placeholder="Phone Number"
              autoComplete="nope"
            />
          </InputGroup>

          <FixedRow>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </FixedRow>

          <InputGroup>
            <Row>
              <Switch defaultChecked />
              <Label>&#160;&#160;By confirming you agree to our terms</Label>
            </Row>
          </InputGroup>

          <InputGroup>
            <Row>
              <StyledButton htmltype="submit">Save Infos </StyledButton>
            </Row>
          </InputGroup>
        </Form>
      </Wrapper>
    </>
  );
};

export default ShopDetails;

/* styles */

const Wrapper = styled.div`
  max-width: 100%;
  min-height: 90vh;
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
  background-color: var(--neut-black);
`;

const Text = styled.h1`
  margin: 1rem 0.5rem;
  color: var(--neut-white);
  text-transform: capitalize;
`;

const Ficon = styled(AiOutlineUnorderedList)`
  font-size: 25px;
  margin: 1rem 0.5rem;
  color: var(--neut-white);
`;

const Form = styled.form``;

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

const FixedRow = styled(Row)`
  display: flex;
  align-items: clear;
  justify-content: center;
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
