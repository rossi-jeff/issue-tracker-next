import AuthButtons from "./auth-buttons";
import NavLinks from "./nav-links";
import { FiList } from "react-icons/fi";

export default function TopBar() {
  return (
    <div id="top-bar">
      <div className="flex flex-wrap justify-between">
        <div className="flex">
          <h1>Issue</h1>
          <span className="mx-2 mt-1">
            <FiList size="1.5em" />
          </span>
          <h1>Tracker</h1>
        </div>
        <AuthButtons />
      </div>
      <NavLinks />
    </div>
  );
}
