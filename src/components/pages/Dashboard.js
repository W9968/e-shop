import React from "react";

import Profile from "../utils/Profile";
import UserList from "../utils/UserList";

const Dashboard = () => {
  document.title = "HANOUTI | Dashboard";

  return (
    <>
      <Profile />
      <UserList />
    </>
  );
};

export default Dashboard;
