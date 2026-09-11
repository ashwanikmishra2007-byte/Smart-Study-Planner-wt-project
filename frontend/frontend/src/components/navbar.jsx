import {Link} from "react-router-dom"

function Navbar() {
    // Navbar component for the Smart Study Planner.
    return(
        <nav
    className="navbar navbar-expand-sm"
    style={{ backgroundColor: "#1E293B" }}
>
        <div className="container-fluid">
            <Link to="/" className="navbar-brand text-light">
                Study Planner
            </Link>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/subject" className="nav-link text-light">
                        Add Subject
                    </Link>
                </li>

                <li className="nav-item ms-3">
                    <Link to="/view" className="nav-link text-light">
                        View
                    </Link>
                </li>
                <li className="nav-item ms-3">
                    <Link to="/update" className="nav-link text-light">
                        Update
                    </Link>
                </li>
                <li className="nav-item ms-3">
                    <Link to="/track" className="nav-link text-light">
                        Track Progress
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
    )
}

export default Navbar;