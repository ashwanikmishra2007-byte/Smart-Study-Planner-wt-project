function Navbar() {
    // Navbar component for the Smart Study Planner.
    return(
        <nav className="navbar navbar-expand-sm bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand text-white" href="#">Logo</a>
             </div>
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <a className="nav-link text-white" href="#">Link1</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;