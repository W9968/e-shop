import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useFireStore, useFireStorage } from "../auth/Firebase";
import firebase from "firebase/app";

// ant design component call
import styled from "styled-components";
import { Row, Select, Card, message, Alert } from "antd";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Pri from "./avatar.svg";

const AddItems = () => {
  // hooks
  const [types, setTypes] = useState(null);
  const [error, setError] = useState("");
  const [upload, setUpload] = useState(true);
  const [imgUrl, setImgUrl] = useState();
  const [socket, setSocket] = useState();
  const history = useHistory();
  const { currentUser } = useAuth();
  // option
  const { Option } = Select;
  const { Meta } = Card;

  //ref
  const productName = useRef();
  const productPrice = useRef();
  const productDisc = useRef();
  const date = new Date().toLocaleDateString();

  function onChange(value) {
    console.log(`selected ${value}`);
    setTypes(value);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  // files upload
  const HandleFile = async (event) => {
    let reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    const ImageName =
      "" + new Date().getTime() + "" + event.target.files[0].name;
    const StorageRef = useFireStorage.ref();
    const fileRef = StorageRef.child(`article/${currentUser.uid}/` + ImageName);
    await fileRef.put(event.target.files[0]).then(() => {
      console.log("file loaded");
      setUpload(false);
      message.success("Image Uploaded");
    });
    setImgUrl(await fileRef.getDownloadURL());
  };

  // pull bucket account
  const DisplayProfile = async () => {
    const docs = useFireStore
      .collection("account-bucket")
      .doc(`${currentUser.uid}`);
    const docsRef = await docs.get();
    setSocket(docsRef.data());
  };

  useEffect(() => {
    return DisplayProfile();
  });

  // save data
  const SendPacketInfo = async (event) => {
    event.preventDefault();

    if (
      productPrice.current.value === "" ||
      isNaN(parseInt(productPrice.current.value))
    ) {
      setError("Insert a correct price");
    } else {
      setError("");
      try {
        message.loading(
          "Saving please wait untill a success message appear..."
        );
        await useFireStore
          .collection("Items")
          .doc("articles")
          .collection(`${currentUser.uid}`)
          .add({
            title: productName.current.value,
            store: socket.storename,
            time: date,
            price: productPrice.current.value,
            infos: productDisc.current.value,
            avatar: imgUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        setError("");
        saveData();
        setUpload(true);
        history.push("/dashboard");
        message.success("Your info ahs been saved");
      } catch {
        setUpload(false);
        message.error("Something went wrong");
      }
    }
  };

  const saveData = async () => {
    return await useFireStore
      .collection("bucket")
      .doc("items")
      .collection(`${types}`)
      .add({
        title: productName.current.value,
        store: socket.storename,
        time: date,
        price: productPrice.current.value,
        infos: productDisc.current.value,
        avatar: imgUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  // manage state
  const [title, setTitle] = useState("name");
  const handleChangeName = (e) => {
    setTitle(e.target.value);
  };

  const [price, setPrice] = useState("price");
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const [discription, setDiscription] = useState("info");
  const handleChange = (e) => {
    setDiscription(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <StyledRow>
          <Text>Add your Product</Text>
          <Ficon />
        </StyledRow>

        <Form onSubmit={SendPacketInfo}>
          <InputGroup>
            <Label>Item Title</Label>
            <StyledInput
              required
              placeholder="Product name"
              type="text"
              ref={productName}
              onChange={handleChangeName}
            />
          </InputGroup>

          <InputGroup>
            <Label>Item Description</Label>
            <StyledInput
              required
              placeholder="Describe your products"
              rows="6"
              ref={productDisc}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Time Zone</Label>
            <StyledInput
              className="datePicker"
              type="text"
              value={date}
              disabled={true}
            />
          </InputGroup>

          <InputGroup>
            <Label>Item Price *dtn</Label>
            <StyledInput
              required
              maxLength="3"
              placeholder="Product price"
              type="text"
              ref={productPrice}
              onChange={handleChangePrice}
            />
          </InputGroup>

          <InputGroup>
            <Label>Item Type</Label>
            <Select
              required
              showSearch
              size="large"
              className="Selection"
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="men">Men</Option>
              <Option value="women">Women</Option>
              <Option value="hats">Hats</Option>
              <Option value="shoes">Shoes</Option>
              <Option value="accessories">Accessories</Option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Image Of your Shop</Label>

            <StyledInput
              required
              type="file"
              name="upload"
              id="upload"
              className="upload-box"
              placeholder="Upload File"
              onChange={HandleFile}
            />
          </InputGroup>

          <InputGroup>
            <p>{error && <Alert message={error} type="error" />}</p>
          </InputGroup>

          <InputGroup>
            <Row>
              <StyledButton disabled={upload} htmltype="submit">
                Save Infos{" "}
              </StyledButton>
            </Row>
          </InputGroup>
        </Form>
        <InputGroup>
          <Card
            type="vertical"
            hoverable
            className="previewImage"
            cover={
              <img
                className="image"
                alt="example"
                src={imgUrl ? imgUrl : `${Pri}`}
              />
            }
          >
            <Meta title={`${title} | ${price} DTN`} description={discription} />
          </Card>
        </InputGroup>
      </Wrapper>
    </>
  );
};

export default AddItems;

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

const Ficon = styled(AiOutlineAppstoreAdd)`
  font-size: 25px;
  margin: 1rem 0.5rem;
  color: var(--neut-white);
`;

const Form = styled.form`
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const InputGroup = styled.div`
  display: flex;
  margin: 2rem 1rem;
  flex-direction: column;

  .datePicker {
    background-color: var(--pola-green);
  }

  .Selection {
    width: 500px;
  }

  @media (max-width: 768px) {
    .Selection {
      width: 100%;
    }
  }

  .previewImage {
    display: flex;
    align-items: center;
  }

  .image {
    width: 150px;
    height: 150px;
  }
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
