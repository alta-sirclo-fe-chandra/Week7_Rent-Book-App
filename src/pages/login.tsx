/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import TextInput from "../components/textInput";
import { reduxAction } from "../stores/actions/action";
import { USER_LOGIN } from "../utils/queries";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInValid, setIsInValid] = useState(false);
  const { loading, data } = useQuery(USER_LOGIN, {
    variables: { email: email, password: password },
  });
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!loading) {
      if (data.users[0]) {
        localStorage.setItem("userInfo", JSON.stringify(data.users[0]));
        dispatch(reduxAction("isLoggedIn", true));
        dispatch(reduxAction("userInfo", data.users[0]));
        Navigate("/");
      } else {
        setIsInValid(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-5">
        <div className="text-center col col-md-5 col-lg-3">
          <NavLink
            className="btn btn-outline-danger btn-lg rounded-pill px-3"
            to="/"
          >
            <GiBookshelf className="mb-1" /> Books
          </NavLink>
          <form className="mt-5" onSubmit={handleLogin}>
            <TextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              isInvalid={isInValid}
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              isInvalid={isInValid}
            />
            <div className="col d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-success rounded-pill">
                Sign In
              </button>
              <NavLink
                to="/register"
                className="btn btn-light border rounded-pill"
              >
                Sign Up
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
