import { Link } from "react-router-dom";
import { ROUTES } from "../router/Router.constants";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to={ROUTES.ROOT}>Home</Link>,<Link to={ROUTES.LOGIN}>Login</Link>
    </div>
  );
}
