import React from "react";
import ExportSets from "../utils/ExportSets";

const Hats = () => {
  document.title = "HANOUTI | Hats";

  return (
    <>
      <ExportSets coll="hats" />
    </>
  );
};

export default Hats;
