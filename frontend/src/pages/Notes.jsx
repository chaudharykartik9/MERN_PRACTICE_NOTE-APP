import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Edit states
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Get Notes
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create Note
  const createNote = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotes();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Open Edit
  const openEdit = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Update Note
  const updateNote = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/notes/${editId}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditId(null);
      setEditTitle("");
      setEditContent("");

      fetchNotes();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          🗒️ My Notes
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* CREATE NOTE */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Create New Note
        </h2>

        <form onSubmit={createNote} className="space-y-4">

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-3 rounded-lg h-28 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            ➕ Add Note
          </button>

        </form>
      </div>

      {/* EDIT NOTE */}
      {editId && (
        <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            ✏️ Edit Note
          </h2>

          <form onSubmit={updateNote} className="space-y-4">

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full border p-3 rounded-lg h-28"
            />

            <div className="flex gap-3">
              <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
                Update
              </button>

              <button
                type="button"
                onClick={() => setEditId(null)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* NOTES GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
          >

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {note.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-4">
                {note.content}
              </p>
            </div>

            <div className="flex justify-between mt-5">

              <button
                onClick={() => openEdit(note)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notes;