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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="display name"
          value={newDisplayName}
          onChange={onChnage}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="update profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
