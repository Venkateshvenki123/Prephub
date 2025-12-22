import { NavLink } from "react-router-dom";

const Navbar = () => (
  <header className="navbar">
    <div className="navbar-content">
      <div className="logo">Prephub</div>
      <div className="navbar-nav">
        <nav>
          <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Home</NavLink>
          <NavLink to="/interview-prep" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Interview Prep</NavLink>
          <NavLink to="/internships" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Internships</NavLink>
          <NavLink to="/free-courses" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Free Courses</NavLink>
          <NavLink to="/jobs" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Jobs</NavLink>
          <NavLink to="/notes" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Notes</NavLink>
          <NavLink to="/about" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>About</NavLink>
          <NavLink to="/auth" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Login / Sign Up</NavLink>
          {/* <NavLink to="/admin/courses" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
            Admin
          </NavLink> */}
        </nav>
      </div>
    </div>
  </header>
);

export default Navbar;
