import Main from "@/Layouts/Main";
import UserLayout from "@/Layouts/UserLayout";
import React from "react";

const UserProfile = () => {
  return <div>UserProfile</div>;
};

UserProfile.layout = (page) => (
  <Main>
    <UserLayout children={page} />
  </Main>
);

export default UserProfile;
