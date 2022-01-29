import { GiBookshelf } from "react-icons/gi";
import { BsClipboard } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/reducers/reducer";
import { reduxAction } from "../stores/actions/action";

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(reduxAction("isLoggedIn", false));
    localStorage.removeItem("userInfo");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <NavLink className="navbar-brand fs-1" to="/">
          Books
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-50">
              <NavLink
                className="btn btn-outline-danger rounded-pill px-3"
                to="/"
              >
                <GiBookshelf className="mb-1" /> Books
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="fs-4 me-lg-3 text-danger"
                    to="/books/rent"
                  >
                    <BsClipboard className="my-3 mt-lg-0" />
                  </NavLink>
                  <NavLink
                    to="/books/rent"
                    className="text-decoration-none text-dark ms-2 d-lg-none"
                  >
                    Rented Book
                  </NavLink>
                </li>
                <li className="nav-item">
                  <p className="avatar bg-danger p-2 fs-6 rounded-circle text-white">
                    <FaUserAlt />
                  </p>
                  <NavLink
                    to="/"
                    className="text-decoration-none text-dark ms-2"
                  >
                    Hi, {userInfo.name}
                  </NavLink>
                  <NavLink
                    to="/"
                    className="text-decoration-none text-dark"
                    onClick={handleLogOut}
                  >
                    <IoLogOutOutline className="ms-2 fs-3" />
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item my-2 my-lg-0 me-3">
                  <NavLink
                    className="nav-link text-decoration-none text-dark"
                    to="/register"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="btn btn-dark rounded-pill px-3"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
