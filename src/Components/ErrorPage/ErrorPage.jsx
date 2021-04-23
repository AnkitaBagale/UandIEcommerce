import { Link } from "react-router-dom";

import waveimg from "./Images/wave.svg";
import erasergif from "./Images/earaser2.gif";
import "./error-page.css";

export const ErrorPage = () => {
  return (
    <>
      <div className="error-message-container">
        <div className="text-center">
          <img className="error-gif" src={erasergif} alt="eraser" />
          <p className="body-cp-lg">We couldn't find any matches!</p>
          <p className="body-cp-md">
            Please check the spelling or try searching something else.
          </p>
          <div className="CTA-Container">
            <Link to="/" className="btn btn-outline-primary">
              Home
            </Link>
            <Link to="/shop" className="btn btn-solid-primary">
              Shop
            </Link>
          </div>
        </div>
      </div>
      <img className="img-responsive" src={waveimg} />
    </>
  );
};
