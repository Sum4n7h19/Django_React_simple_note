import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/home.css"

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNote();
      })
      .catch((error) => alert(error));
  };
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNote();
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="note-section">
      <div className="note">
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <form onSubmit={createNote}>
        <h2>Create a Note</h2>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="submir"></input>
      </form>
    </div>
  );
};

export default Home;
