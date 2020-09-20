import React from "react";
import { authService } from "fbase";
import { onLog } from "firebase";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory(); //리액트 훅
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
