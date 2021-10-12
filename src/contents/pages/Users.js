import React from "react";

import UsersList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Chimchak Lee",
      image: "https://asianwiki.com/images/c/c6/Lee_Mal-Nyeon-1982-p1.jpg",
      places: 2,
    },
    {
      id: "u2",
      name: "Justin Jang",
      image: "https://justin-jang.com/static/media/profile-img.60e75f9c.png",
      places: 0,
    },
  ];
  return (
    <React.Fragment>
      <UsersList items={USERS} />
    </React.Fragment>
  );
};

export default Users;
