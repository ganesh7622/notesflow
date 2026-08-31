
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";

function Notes() {

  // ==================== AOS ====================

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });

    console.log("AOS INITIALIZED");
  }, []);


  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSavedNotes, setShowSavedNotes] = useState(false);

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [userName, setUserName] = useState(
    localStorage.getItem("userName")
  );

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();


  // ==================== GET USER NOTES ====================

  useEffect(() => {

    const fetchNotes = async () => {

      if (!userId) {
        navigate("/signup");
        return;
      }

      try {

        const response = await fetch(
          `http://localhost:5000/api/notes/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch notes");
          return;
        }

        setNotes(data);

      } catch (error) {

        console.error("Fetch notes error:", error);
        alert("Unable to connect to server.");

      }
    };

    fetchNotes();

  }, [userId, navigate]);


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


  // ==================== SAVE / UPDATE NOTE ====================

  const handleSaveNote = async () => {

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and note");
      return;
    }

    if (!userId) {
      alert("Please sign in first.");
      navigate("/signup");
      return;
    }

    try {

      // ==================== UPDATE NOTE ====================

      if (editingId !== null) {

        const response = await fetch(
          `http://localhost:5000/api/notes/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              title,
              content,
              userId,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to update note");
          return;
        }

        setNotes((previousNotes) =>
          previousNotes.map((note) =>
            note._id === editingId ? data.note : note
          )
        );

      } else {

        // ==================== CREATE NOTE ====================

        const response = await fetch(
          "http://localhost:5000/api/notes",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              title,
              content,
              userId,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to create note");
          return;
        }

        setNotes((previousNotes) => [
          data.note,
          ...previousNotes,
        ]);
      }

      setTitle("");
      setContent("");
      setEditingId(null);
      setShowPopup(false);
      setShowSavedNotes(true);

    } catch (error) {

      console.error("Save note error:", error);
      alert("Unable to connect to server.");

    }
  };


  // ==================== EDIT NOTE ====================

  const handleEditNote = (note) => {

    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
    setShowPopup(true);

  };


  // ==================== ADD NOTE ====================

  const handleAddNote = () => {

    setTitle("");
    setContent("");
    setEditingId(null);
    setShowPopup(true);

  };


  // ==================== SEE NOTES ====================

  const handleSeeNotes = () => {

    setShowSavedNotes(true);

  };


  // ==================== DELETE NOTE ====================

  const handleDeleteNote = async (id) => {

    if (!userId) {
      alert("Please sign in first.");
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/notes/${id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete note");
        return;
      }

      const updatedNotes = notes.filter(
        (note) => note._id !== id
      );

      setNotes(updatedNotes);

      if (updatedNotes.length === 0) {
        setShowSavedNotes(false);
      }

    } catch (error) {

      console.error("Delete note error:", error);
      alert("Unable to connect to server.");

    }
  };


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

            <li
              data-aos="fade-down"
              data-aos-delay="200"
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
              data-aos-delay="300"
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
              data-aos-delay="400"
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


      {/* ==================== MAIN NOTES PAGE ==================== */}

      {!showSavedNotes ? (

        <section className="notes-section">

          <div
            className="notes-content"
            data-aos="fade-up"
          >

            <h1
              data-aos="fade-up"
              data-aos-delay="100"
            >
              NotesFlow
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Keep your thoughts organized, save important ideas,
              and access your notes anytime in one simple place.
              NotesFlow helps you manage everything effortlessly,
              whether you're planning your day, writing down ideas,
              or keeping track of important information.
            </p>

          </div>


          {/* ==================== NOTES POINTS ==================== */}

          <ul className="notes-points">

            <li
              data-aos="fade-right"
              data-aos-delay="200"
            >
              ✍️ Create and save notes quickly
            </li>

            <li
              data-aos="fade-right"
              data-aos-delay="300"
            >
              📝 Edit your notes anytime
            </li>

            <li
              data-aos="fade-right"
              data-aos-delay="400"
            >
              🗑️ Delete notes you no longer need
            </li>

            <li
              data-aos="fade-right"
              data-aos-delay="500"
            >
              ☁️ Keep your notes safely stored in MongoDB
            </li>

            <li
              data-aos="fade-right"
              data-aos-delay="600"
            >
              📱 Access and manage your notes with a simple interface
            </li>

          </ul>


          {/* ==================== ACTION BUTTONS ==================== */}

          <div
            className="notes-actions"
            data-aos="zoom-in"
            data-aos-delay="300"
          >

            <button
              className="see-note-btn"
              onClick={handleSeeNotes}
            >
              See your Notes
            </button>

            <button
              className="add-note-btn"
              onClick={handleAddNote}
              aria-label="Add new note"
            >
              +
            </button>

          </div>


          {/* ==================== IMAGE ==================== */}

          <div className="homepage-picture">
            <img
              src={logo}
              alt="home page picture"
              data-aos="zoom-in"
              data-aos-delay="500"
            />
          </div>

        </section>

      ) : (

        /* ==================== SAVED NOTES ==================== */

        <section className="saved-notes-section">

          <button
            className="back-btn"
            onClick={() => setShowSavedNotes(false)}
            data-aos="fade-right"
          >
            ← Back to Notes
          </button>


          {notes.length === 0 ? (

            <p
              className="no-notes"
              data-aos="fade-up"
            >
              You don't have any notes yet.
            </p>

          ) : (

            <div className="notes-grid">

              {notes.map((note, index) => (

                <div
                  className="note-card"
                  key={note._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >

                  <h2>
                    {note.title}
                  </h2>

                  <p>
                    {note.content}
                  </p>


                  <div className="note-actions">

                    <button
                      className="edit-note-btn"
                      onClick={() => handleEditNote(note)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-note-btn"
                      onClick={() =>
                        handleDeleteNote(note._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      )}


      {/* ==================== NOTE POPUP ==================== */}

      {showPopup && (

        <div
          className="note-popup-overlay"
          data-aos="fade-in"
        >

          <div
            className="note-popup"
            data-aos="zoom-in"
          >

            <button
              className="close-popup"
              onClick={() => setShowPopup(false)}
            >
              <FaTimes />
            </button>

            <h2 data-aos="fade-down">
              {editingId !== null
                ? "Edit Note"
                : "Create New Note"}
            </h2>


            <div
              className="input-group"
              data-aos="fade-up"
              data-aos-delay="100"
            >

              <label>
                Note Title
              </label>

              <input
                type="text"
                placeholder="Enter your note title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>


            <div
              className="input-group"
              data-aos="fade-up"
              data-aos-delay="200"
            >

              <label>
                Note
              </label>

              <textarea
                placeholder="Write your note here..."
                rows="6"
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
              ></textarea>

            </div>


            <div
              className="popup-buttons"
              data-aos="fade-up"
              data-aos-delay="300"
            >

              <button
                className="cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className="save-note-btn"
                onClick={handleSaveNote}
              >
                {editingId !== null
                  ? "Update Note"
                  : "Save Note"}
              </button>

            </div>

          </div>

        </div>
      )}


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
            Organize your thoughts, manage your notes,
            and keep your ideas flowing with NotesFlow.
          </p>

        </div>


        <div
          className="footer-links"
          data-aos="fade-up"
          data-aos-delay="200"
        >

          <Link to="/">Home</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/contact">Contact</Link>

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
  );
}

export default Notes;
