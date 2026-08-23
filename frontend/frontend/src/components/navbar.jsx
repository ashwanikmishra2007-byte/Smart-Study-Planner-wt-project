import {Link} from "react-router-dom"

function Navbar() {
    // Navbar component for the Smart Study Planner.
    return(
        <nav className="navbar navbar-expand-sm bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand text-light" href="#">Study Planner</a>
             </div>
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <Link to = "/subject">Subjects</Link>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;