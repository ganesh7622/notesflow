import AOS from "aos";
import "aos/dist/aos.css";
import confetti from "canvas-confetti";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaLinkedin,
  FaGithub,
  FaInstagram
} from "react-icons/fa";

import "./App.css";
import logo from "./logo.png";


function Contact() {

  // ==================== AOS ====================

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    console.log("AOS INITIALIZED");
  }, []);


  const [menuOpen, setMenuOpen] = useState(false);

  const [userName, setUserName] = useState(
    localStorage.getItem("userName")
  );

  const [result, setResult] = useState("");

  const navigate = useNavigate();


  // ==================== LOGOUT ====================

  const handleLogout = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("notes");

    setUserName(null);
    setMenuOpen(false);

    navigate("/signup");
  };


  // ==================== CONTACT FORM ====================

  const onSubmit = async (event) => {

    event.preventDefault();

    setResult("Sending....");

    const formData = new FormData(event.target);

    formData.append(
      "access_key",
      "d319b789-9aef-4dcf-bd7c-48536a7a58bb"
    );

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (data.success) {

      setResult(
        "Message sent successfully! 🎉"
      );

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      event.target.reset();

    } else {

      setResult("Error");

    }
  };


  return (
    <>
      {/* ================================
          NAVBAR
      ================================= */}

      <section
        className="nav-section"
        data-aos="fade-down"
      >

        <nav className="nav-bar">

          <div
            className="nav-brand"
            data-aos="fade-right"
          >

            <img
              src={logo}
              alt="NotesFlow logo"
              data-aos="zoom-in"
            />

            <h1
              className="nav-heading"
              data-aos="fade-right"
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
            data-aos="fade-left"
            data-aos-delay="200"
          >

            <li
              data-aos="fade-down"
              data-aos-delay="300"
            >
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>


            <li
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <Link
                to="/notes"
                onClick={() => setMenuOpen(false)}
              >
                Notes
              </Link>
            </li>


            <li
              data-aos="fade-down"
              data-aos-delay="500"
            >
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
                  data-aos-delay="600"
                >

                  <span className="user-name">
                    👤 {userName}
                  </span>

                </li>


                <li
                  data-aos="fade-down"
                  data-aos-delay="700"
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
                data-aos-delay="600"
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
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
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


      {/* ==================== CONTACT SECTION ==================== */}

      <section className="contact-section">

        {/* ==================== CONTACT INFO ==================== */}

        <div
          className="contact-info"
          data-aos="fade-right"
        >

          <span
            className="contact-tag"
            data-aos="fade-up"
          >
            GET IN TOUCH
          </span>


          <h1
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Let's Connect
          </h1>


          <p
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Have a question, suggestion, or feedback?
            Feel free to get in touch with us. I'd love to
            hear from you and connect with you.
          </p>


          {/* ==================== SOCIAL LINKS ==================== */}

          <div className="social-links">

            <a
              href="https://www.linkedin.com/in/ganeshm7622/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <FaLinkedin />
            </a>


            <a
              href="https://github.com/ganesh7622"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <FaGithub />
            </a>


            <a
              href="https://www.instagram.com/__jack___xz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <FaInstagram />
            </a>

          </div>

        </div>


        {/* ==================== CONTACT FORM ==================== */}

        <div
          className="contact-box"
          data-aos="fade-left"
        >

          <h2
            data-aos="fade-up"
          >
            Send Me a Message
          </h2>


          <p
            className="contact-box-text"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Fill out the form below and I'll get back to you soon.
          </p>


          <form onSubmit={onSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              data-aos="fade-up"
              data-aos-delay="300"
            />


            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              data-aos="fade-up"
              data-aos-delay="400"
            />


            <textarea
              placeholder="Write your message..."
              name="message"
              required
              data-aos="fade-up"
              data-aos-delay="500"
            ></textarea>


            <button
              type="submit"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              Send Message
            </button>


            <span
              data-aos="fade-up"
              data-aos-delay="700"
            >
              {result}
            </span>

          </form>

        </div>

      </section>


      {/* ==================== FOOTER ==================== */}

      <footer className="footer">

        <div
          className="footer-content"
          data-aos="fade-up"
        >

          <h2 data-aos="fade-up">
            NotesFlow
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Organize your thoughts, manage your notes,
            and keep your ideas flowing with NotesFlow.
          </p>

        </div>


        <div
          className="footer-links"
          data-aos="fade-up"
          data-aos-delay="300"
        >

          <Link
            to="/"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Home
          </Link>

          <Link
            to="/notes"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Notes
          </Link>

          <Link
            to="/contact"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Contact
          </Link>

        </div>


        <div
          className="footer-bottom"
          data-aos="fade-up"
          data-aos-delay="400"
        >

          <p>
            © 2026 NotesFlow. All rights reserved.
          </p>

        </div>

      </footer>

    </>
  );
}


export default Contact;

