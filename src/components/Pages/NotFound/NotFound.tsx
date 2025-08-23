import { Link } from "react-router";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <span className="not-found-main">Ooops... </span>
      <span className="not-found-info">
        It seems that the page you're looking for does not exists!&nbsp;
      </span>
      <Link to="/home" className="not-found-link">
        Take me back
      </Link>
    </>
  );
};

export default NotFound;
