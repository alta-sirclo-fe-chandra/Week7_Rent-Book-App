import { Image } from "react-bootstrap";

const Error404 = () => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <Image
          src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
          className="App-logo"
          alt="logo"
          height="200"
        />
        <p className="mt-3 fs-3">Page Not Found</p>
      </div>
    </div>
  );
};

export default Error404;
