import React from "react";
import ExportSets from "../utils/ExportSets";

const Shoes = () => {
  document.title = "HANOUTI | Shoes";

  return (
    <>
      <ExportSets coll="shoes" />
    </>
  );
};

export default Shoes;
