/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Modal, Pagination } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import bannersm from "../assets/images/banner-sm.svg";
import { RootState } from "../stores/reducers/reducer";
import { GET_BOOKS, GET_BOOKS_COUNT, RENT_BOOK } from "../utils/queries";

const Index = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const [page, setPage] = useState([1]);
  const [activePage, setActivePage] = useState(1);
  const [limitPage, setLimitPage] = useState(10);
  const [offset, setOffset] = useState(0);

  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [rentBook] = useMutation(RENT_BOOK);

  const Navigate = useNavigate();
  const { loading, data, refetch } = useQuery(GET_BOOKS, {
    variables: { limit: limitPage, offset: offset },
  });
  const { loading: loading_count, data: data_count } =
    useQuery(GET_BOOKS_COUNT);

  const handlePage = (page: number) => {
    setActivePage(page);
    const temp = limitPage * (page - 1);
    setOffset(temp);
  };

  const handlePrevPage = () => {
    const temp = activePage - 1;
    handlePage(temp);
  };

  const handleNextPage = () => {
    const temp = activePage + 1;
    handlePage(temp);
  };

  const handleLimitPage = (e: any) => {
    setLimitPage(Number(e.target.value));
    setOffset(0);
    setActivePage(1);
  };

  const handleRent = () => {
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

  useEffect(() => {
    refetch();
  }, [offset, limitPage]);

  useEffect(() => {
    if (!loading_count) {
      const totalPage = Math.ceil(
        data_count.books_aggregate.aggregate.count / limitPage
      );
      const temp: number[] = [];
      for (let i = 1; i <= totalPage; i++) {
        temp.push(i);
      }
      setPage(temp);
    }
  }, [data_count, limitPage, loading_count]);

  return (
    <div className="container my-3 my-md-5">
      <div id="banner" className="row justify-content-center pb-md-5">
        <div className="col-lg-4 pb-md-5">
          <h1 className="display-4">New & Tranding</h1>
          <p className="my-3">Explorer new worlds from authors</p>
          <form className="d-flex gap-2 col col-md-5 col-lg-9 mb-4">
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn" type="submit">
              <BsSearch />
            </button>
          </form>
        </div>
        <div className="col-lg-4" />
        <div className="p-lg-5 mb-lg-5 d-none d-md-block" />
      </div>
      <div className="d-block d-md-none">
        <img id="banner-sm" className="img-fluid" src={bannersm} alt="banner" />
      </div>
      <div id="book" className="row">
        {!loading ? (
          data.books.map((item: any) => (
            <div key={item.id} className="col-md-6 col-lg-4 my-3">
              <div className="row g-0">
                <div className="col-4 align-self-center">
                  <img
                    src={item.image}
                    className="img-fluid rounded border shadow"
                    alt="book"
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5
                      className="card-title title"
                      style={{ cursor: "pointer" }}
                      onClick={() => Navigate(`/books/${item.id}`)}
                    >
                      {item.title}
                    </h5>
                    <p className="card-text">
                      <small className="text-muted">{item.author}</small>
                    </p>
                    {isLoggedIn ? (
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill mt-lg-4"
                        onClick={() => {
                          setShowModal(true);
                          setId(item.id);
                        }}
                      >
                        Rent Now
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill mt-lg-4"
                        onClick={() => {
                          Navigate("/login");
                        }}
                      >
                        Rent Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <div className="col-lg-1 me-3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => handleLimitPage(e)}
          >
            <option defaultValue={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <Pagination>
          <Pagination.Prev
            onClick={handlePrevPage}
            disabled={activePage <= 1}
          />
          {page.map((item: any) => (
            <Pagination.Item
              key={item}
              active={item === activePage}
              onClick={() => handlePage(item)}
            >
              {item}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={handleNextPage}
            disabled={
              !loading_count
                ? activePage >=
                  Math.ceil(
                    data_count.books_aggregate.aggregate.count / limitPage
                  )
                : false
            }
          />
        </Pagination>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Return Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoading ? (
            <div className="form-group">
              <p>Select date to return this book</p>
              <ReactDatePicker
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
  );
};

export default Index;
