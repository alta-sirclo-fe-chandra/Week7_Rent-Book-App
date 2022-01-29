/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOK_ID, RENT_BOOK } from "../../utils/queries";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/reducers/reducer";
import { Modal } from "react-bootstrap";

const Id = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();
  const [rentBook] = useMutation(RENT_BOOK);
  const { loading, data } = useQuery(GET_BOOK_ID, {
    variables: { id: id },
  });

  const handleRent = async () => {
    setIsLoading(true);
    rentBook({
      variables: { book_id: id, return_date: date, user_id: userInfo.id },
    })
      .then(() => {
        Swal.fire("Good job!", "You rented this book", "success");
      })
      .finally(() => {
        setShowModal(false);
        setIsLoading(false);
      });
    setDate(new Date());
  };

  return !loading ? (
    <div className="container my-3 my-md-5">
      <div className="row justify-content-evenly">
        <div className="col-8 col-md-4 col-lg-3 text-center">
          <img
            src={data.books[0].image}
            className="img-fluid rounded border shadow"
            alt="book"
          />
        </div>
        <div className="col-md-6 col-lg-5 mt-5 mt-md-0 text-center text-md-start">
          <h2>
            <span className="badge rounded-pill bg-secondary">
              {data.books[0].genre}
            </span>
          </h2>
          <h2 className="my-3">{data.books[0].title}</h2>
          <p>{data.books[0].author}</p>
          <p>ISBN: {data.books[0].ISBN}</p>
          {isLoggedIn ? (
            <button
              className="btn btn-outline-danger px-4 rounded-pill mt-4"
              onClick={() => setShowModal(true)}
            >
              Rent Now
            </button>
          ) : (
            <button
              className="btn btn-outline-danger px-4 rounded-pill mt-4"
              onClick={() => Navigate("/login")}
            >
              Rent Now
            </button>
          )}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Return Date</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!isLoading ? (
                <div className="form-group">
                  <p>Select date to return this book</p>
                  <DatePicker
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                    dateFormat={"yyyy/MM/dd"}
                    className="form-control"
                  />
                </div>
              ) : (
                <div>Prosesing your book...</div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-success rounded-pill px-4"
                disabled={isLoading}
                onClick={handleRent}
              >
                Rent
              </button>
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                disabled={isLoading}
              >
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">Loading...</div>
  );
};

export default Id;
