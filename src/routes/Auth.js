import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    console.log(event.target.name);
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault(); // 기본 행위 방지 이게 없으면 새로고침 됨.
    try {
      if (newAccount) {
        //create account
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      } else {
        //log in
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        ></input>
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
