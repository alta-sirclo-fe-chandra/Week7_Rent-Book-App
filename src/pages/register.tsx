import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import TextInput from "../components/textInput";
import { USER_REGISTER } from "../utils/queries";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [register] = useMutation(USER_REGISTER);
  const Navigate = useNavigate();

  const handleRegister = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    register({
      variables: { name: name, email: email, password: password },
    })
      .then(() => {
        Swal.fire("Good job!", "Your account has been created", "success").then(
          (res) => {
            if (res.isConfirmed) {
              Navigate("/login");
            }
          }
        );
      })
      .finally(() => setIsLoading(false));
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
          {!isLoading ? (
            <>
              <h4 className="my-4">Daftar Sekarang</h4>
              <form className="mt-4" onSubmit={handleRegister}>
                <TextInput
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
                <TextInput
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <TextInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <div className="col d-grid gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn btn-success rounded-pill"
                  >
                    Sign Up Now
                  </button>
                  <NavLink
                    to="/login"
                    className="btn btn-light border rounded-pill"
                  >
                    Sign In
                  </NavLink>
                </div>
              </form>
            </>
          ) : (
            <div className="mt-4">Creating your account...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
