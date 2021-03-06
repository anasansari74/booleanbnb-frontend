import React, { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Header from "../components/Header";
import useStore from "../store";
import { Props } from "../App";

const initialForm = {
  email: "",
  password: "",
};

export type UserCredentials = {
  email: string;
  password: string;
};

// type LoginProps = {
// 	className: string
// }

function LoginPage(props) {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState<UserCredentials>(initialForm);

  const loggedUser = useStore(store => store.loggedUser);
  const setLoggedUser = useStore(store => store.setLoggedUser);
  //   const [loggedUser, setLoggedUser] = useState<User | null>(null);
  console.log(loggedUser);

  function handleChange(e: SyntheticEvent) {
    const { name, value } = e.target as HTMLInputElement;

    setLoginForm({ ...loginForm, [name]: value });
  }

  function handleSubmit(loginForm: UserCredentials) {
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginForm),
    })
      .then(resp => resp.json())
      .then(
        user => {
          setLoggedUser(user);
          props.setUserLoggedIn(true);
          console.log(user.data.id);
          props.setUserId(user.data.id);
          history.push(`/dashboard/${user.data.id}`);
        }

        //store currentUser data in state and send the currenUser somewhere
        //use.history
      );
    setLoginForm(initialForm);
  }

  return (
    <div className={props.className}>
      <Header
        className={props.className}
        userLoggedIn={props.userLoggedIn}
        setUserLoggedIn={props.setUserLoggedIn}
        userId={props.userId}
      />
      <main>
        <form
          className="loginForm container"
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(loginForm);
          }}
        >
          <input
            onChange={handleChange}
            type="email"
            placeholder="Email"
            name="email"
            value={loginForm.email}
            required
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            value={loginForm.password}
            required
            min={10}
          />
          <button>Login</button>
          {/* <input type="submit" value="Login" /> */}
        </form>
      </main>
    </div>
  );
}

export default styled(LoginPage)`
  display: grid;
  grid-template-rows: 120px 1fr;

  .loginForm {
    display: grid;
    height: calc(100vh - 112px);
    place-items: center;
    align-content: center;
    grid-template-rows: repeat(3, 50px);
    grid-gap: 20px;
  }

  input,
  button {
    width: 400px;
    height: 50px;
    border-radius: 20px;
    border: 1px solid lightgrey;
    padding: 10px;
  }
`;
