import { Link } from "react-router-dom";

function Navbar() {
  // Navbar component for the Smart Study Planner.
  return (
    <nav
      className="navbar navbar-expand-sm shadow-sm"
      style={{
        backgroundColor: "#1E293B",
        minHeight: "65px",
      }}
    >
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand text-light fw-bold d-flex align-items-center"
        >
          <span className="fs-4 me-2">📚</span>
          <span>Study Planner</span>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link to="/subject" className="nav-link text-light px-3">
              ➕ Add Subject
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/view" className="nav-link text-light px-3">
              📖 View
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/update" className="nav-link text-light px-3">
              ✏️ Update
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/track" className="nav-link text-light px-3">
              📊 Track Progress
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link text-light px-3">
              📊 Schedule
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
