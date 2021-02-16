import { Link } from "react-router-dom";

const Navigaton = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{userObj.displayName}'s Profile</Link>
      </li>
    </ul>
  </nav>
);

export default Navigaton;