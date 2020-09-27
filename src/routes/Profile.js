import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory(); //리액트 훅
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChnage = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="display name"
          value={newDisplayName}
          onChange={onChnage}
        />
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
