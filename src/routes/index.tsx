/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Book from "../pages";
import Rent from "../pages/books/rent";
import BookDetail from "../pages/books/_id";
import Error404 from "../pages/error404";
import Login from "../pages/login";
import Register from "../pages/register";
import { reduxAction } from "../stores/actions/action";
import { RootState } from "../stores/reducers/reducer";

const Index = () => {
  const client = new ApolloClient({
    uri: "https://intent-dinosaur-80.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "CFARYB8OdO6jBucy3UW8L8Hec5TSVbf3CtLMrjk3PV3XG07vtIG5eA6997TEYpuy",
    },
    cache: new InMemoryCache(),
  });

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);

  useEffect(() => {
    const tokenString = localStorage.getItem("userInfo");
    const userToken = JSON.parse(tokenString || "{}");
    if (userToken.id) {
      dispatch(reduxAction("isLoggedIn", true));
      dispatch(reduxAction("userInfo", userToken));
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Book />} />
            <Route path="books" element={<Navigate to="/" />} />
            <Route path="books/:id" element={<BookDetail />} />
            <Route
              path="books/rent"
              element={isLoggedIn ? <Rent /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Index;
