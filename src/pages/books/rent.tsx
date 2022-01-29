/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/reducers/reducer";
import { DELETE_RENT, GET_MY_RENT, UPDATE_RENT } from "../../utils/queries";

const Rent = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { loading, data, refetch } = useQuery(GET_MY_RENT, {
    variables: { id: userInfo.id },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [updateReturned] = useMutation(UPDATE_RENT);
  const [deleteRent] = useMutation(DELETE_RENT);

  useEffect(() => {
    refetch();
  }, []);

  const handleReturn = (item: any) => {
    setIsLoading(true);
    updateReturned({
      variables: { id: item.id },
    })
      .then(() => refetch())
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (item: any) => {
    setIsLoading(true);
    deleteRent({
      variables: { id: item.id },
    })
      .then(() => refetch())
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container mt-3 mb-5">
      <h1 className="display-5 fs-2 mb-3">History</h1>
      {!loading && !isLoading ? (
        data.users[0].rents ? (
          data.users[0].rents.map((item: any) => (
            <div className="row shadow rounded-3 p-4 mx-3 mx-md-0 my-3 justify-content-center justify-content-md-between">
              <div className="col-8 col-md-3 col-lg-2 text-center mb-4">
                <img
                  src={item.book.image}
                  className="img-fluid rounded border shadow"
                  alt="book"
                />
              </div>
              <div className="col-md-5 align-self-center">
                {item.returned ? (
                  <button className="btn btn-sm btn-outline-success rounded-pill">
                    Finish
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-info rounded-pill">
                    Rented
                  </button>
                )}
                <h5 className="my-3">{item.book.title}</h5>
                <p>{item.book.author}</p>
              </div>
              <div className="col-md-2 align-self-center">
                <strong>Due Date:</strong>
                <p className="m-0">{item.return_date}</p>
              </div>
              {!item.returned ? (
                <div className="col-md-2 align-self-center text-end text-lg-center">
                  <button
                    className="btn btn-outline-success px-4 rounded-pill my-4"
                    onClick={() => handleReturn(item)}
                  >
                    Return
                  </button>
                </div>
              ) : (
                <div className="col-md-2 align-self-center text-end text-lg-center">
                  <button
                    className="btn btn-outline-dark px-4 rounded-pill my-4"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div></div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Rent;
