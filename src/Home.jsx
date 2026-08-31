import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './App.css'
import logo from './logo.png'

function Home() {

  // ==================== AOS ====================

  useEffect(() => {
  AOS.init({
    duration: 2000,
    once: true,
  });

  console.log("AOS INITIALIZED");
}, []);

  const [menuOpen, setMenuOpen] = useState(false)

  const [userName, setUserName] = useState(
    localStorage.getItem("userName")
  )

  const navigate = useNavigate()

  // ==================== LOGOUT ====================

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("notes")

    setUserName(null)
    setMenuOpen(false)

    navigate("/signup")
  }

  return (
    <>
      {/* ==================== NAVBAR ==================== */}

      <section className="nav-section">

        <nav className="nav-bar">

          <div
            className="nav-brand"
            data-aos="fade-right"
          >

            <img
              src={logo}
              alt="logo"
              data-aos="zoom-in"
            />

            <h1
              className="nav-heading"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              NotesFlow
            </h1>

          </div>


          <ul
            className={
              menuOpen
                ? "nav-links active"
                : "nav-links"
            }
          >

            <li data-aos="fade-down" data-aos-delay="200">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li data-aos="fade-down" data-aos-delay="300">
              <Link
                to="/notes"
                onClick={() => setMenuOpen(false)}
              >
                Notes
              </Link>
            </li>

            <li data-aos="fade-down" data-aos-delay="400">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>


            {/* ==================== USER / LOGOUT ==================== */}

            {userName ? (
              <>

                <li
                  data-aos="fade-down"
                  data-aos-delay="500"
                >
                  <span className="user-name">
                    👤 {userName}
                  </span>
                </li>

                <li
                  data-aos="fade-down"
                  data-aos-delay="600"
                >
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

              </>
            ) : (

              <li
                data-aos="fade-down"
                data-aos-delay="500"
              >
                <Link
                  to="/signup"
                  className="sign-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </li>

            )}

          </ul>


          {/* ==================== HAMBURGER ==================== */}

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            {menuOpen
              ? <FaTimes />
              : <FaBars />
            }
          </button>

        </nav>

      </section>


      {/* ==================== HOME SECTION ==================== */}

      <section className="home-section">

        <h1
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Your Thoughts, Perfectly Organized
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Capture ideas, manage important tasks, and keep everything that
          matters in one simple place. NotesFlow makes organizing your
          everyday thoughts fast, easy, and effortless.
        </p>

        <Link
          to="/notes"
          className="btn-1"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          Write your Notes
        </Link>

      </section>


      {/* ==================== FOOTER ==================== */}

      <footer className="footer">

        <div
          className="footer-content"
          data-aos="fade-up"
        >

          <h2>
            NotesFlow
          </h2>

          <p>
            Organize your thoughts, manage your notes, and keep your ideas
            flowing with NotesFlow.
          </p>

        </div>


        <div
          className="footer-links"
          data-aos="fade-up"
          data-aos-delay="200"
        >

          <Link
            to="/"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Home
          </Link>

          <Link
            to="/notes"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Notes
          </Link>

          <Link
            to="/contact"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Contact
          </Link>

        </div>


        <div
          className="footer-bottom"
          data-aos="fade-up"
          data-aos-delay="300"
        >

          <p>
            © 2026 NotesFlow. All rights reserved.
          </p>

        </div>

      </footer>
    </>
  )
}

export default Home

