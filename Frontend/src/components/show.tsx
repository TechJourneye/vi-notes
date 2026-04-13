import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function MyNotes() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
      return;
    }
    const loadNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/mynotes", {
          withCredentials: true,
        });

        if (res.data.success) {
          setNotes(res.data.notes);
        }
      } catch (error) {
        console.log(error);
      }
    };

    void loadNotes();
  }, [cookies.token, navigate]);

  const deleteNote = async (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const res = await axios.delete(`http://localhost:8080/note/${noteId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          alert("Note deleted ✅");
          const refreshedNotes = await axios.get("http://localhost:8080/mynotes", {
            withCredentials: true,
          });

          if (refreshedNotes.data.success) {
            setNotes(refreshedNotes.data.notes);
          }
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || "Failed to delete note");
          return;
        }

        alert("Failed to delete note");
      }
    }
  };

  return (
    <div className="notes-container">
      <h2 className="notes-title"> My Notes :)</h2>

      {notes.length === 0 ? (
        <p className="empty-text">No notes found ❌</p>
      ) : (
        <div className="notes-row">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <h4 className="note-title">{note.title}</h4>
              <p className="note-content">{note.content}</p>
              <small className="note-date">
                {new Date(note.createdAt).toLocaleString()}
              </small>
              <div className="note-actions">
                <button
                  onClick={() => navigate(`/note/${note._id}`)}
                  className="note-action-btn note-view-btn"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/edit/${note._id}`)}
                  className="note-action-btn note-edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => void deleteNote(note._id)}
                  className="note-action-btn note-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}