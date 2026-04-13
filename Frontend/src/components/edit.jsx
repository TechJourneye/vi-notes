import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
      return;
    }

    fetchNote();
  }, [cookies.token, id]);

  const fetchNote = async () => {
    try {
      const res = await axios.get("http://localhost:8080/mynotes", {
        withCredentials: true,
      });

      if (res.data.success) {
        const note = res.data.notes.find((n) => n._id === id);
        if (note) {
          setFormData({
            title: note.title,
            content: note.content,
          });
        } else {
          alert("Note not found");
          navigate("/");
        }
      }
      setLoading(false);
    } catch (err) {
      console.log("Error fetching note:", err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Title and Content are required");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8080/note/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Note updated successfully ✅");
        navigate("/");
      }
    } catch (err) {
      console.log("ERROR:", err);
      alert(err.response?.data?.message || "Failed to update note");
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Loading...</div>;
  }

  if (!cookies.token) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Please login to edit notes</h2>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="editor">
          <h2>Edit Note</h2>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
          <br />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Start writing your notes..."
            rows={15}
            className="content"
          />

          <p>
            Word Count:{" "}
            {formData.content.trim() === ""
              ? 0
              : formData.content.trim().split(/\s+/).length}
          </p>

          <div>
            <button
              type="submit"
              style={{
                marginRight: "10px",
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Update Note
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
