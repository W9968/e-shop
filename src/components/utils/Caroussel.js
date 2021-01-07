import React from "react";

// ant design component call
import styled from "styled-components";
import { Carousel } from "antd";

import Shop1 from "../assets/carsouss/shop.jpg";
import Shop2 from "../assets/carsouss/shop2.jpg";
import Shop3 from "../assets/carsouss/shop3.jpg";
import Shop4 from "../assets/carsouss/shop1.png";

const Caroussel = () => {
  const contentStyle = {
    color: "#fff",
    width: "100%",
    height: "180px",
    fontWeight: "600",
    lineHeight: "180px",
    textAlign: "center",
    letterSpacing: "1px",
    textTransform: "uppercase",
    background: "rgba(0,0,0, 0.5)",
  };

  return (
    <>
      <SlierShow autoplay effect="fade">
        <div className="slide s1">
          <h3 style={contentStyle}>online store</h3>
        </div>
        <di className="slide s2">
          <h3 style={contentStyle}>buy online</h3>
        </di>
        <div className="slide s3">
          <h3 style={contentStyle}>guaranteed sells</h3>
        </div>
        <div className="slide s4">
          <h3 style={contentStyle}>secure payment</h3>
        </div>
      </SlierShow>
      ,
    </>
  );
};

export default Caroussel;

const SlierShow = styled(Carousel)`
  .slide {
    height: 180px;
    background-size: cover;
  }

  .s1 {
    background-image: url(${Shop1});
  }

  .s2 {
    background-image: url(${Shop2});
  }

  .s3 {
    background-image: url(${Shop3});
  }

  .s4 {
    background-image: url(${Shop4});
  }
`;
