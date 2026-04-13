import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Editor() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Title and Content are required ");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/note", formData, {
        withCredentials: true,
      });

      console.log(res.data);
      alert("Note saved ");

      setFormData({
        title: "",
        content: "",
      });
    } catch (err: any) {
      console.log("ERROR:", err);
      alert(err.response?.data?.message || "Failed to save note ");
    }
  };


  if (!cookies.token) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Want to create some notes?</h2>
        <p>Please login first to continue.</p>

        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary"
        >
          Go to Login
        </button>
      </div>
    );
  }

  
  return (
    <div className="editor-container">
      <form onSubmit={onSubmit} className="editor-card">
        <h2 className="editor-title"> Vi-Notes Editor</h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handelChange}
          placeholder="Enter title"
          className="editor-input"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handelChange}
          placeholder="Start writing your notes..."
          rows={12}
          className="editor-textarea"
        />

        <p className="word-count">
          Word Count:{" "}
          {formData.content.trim() === ""
            ? 0
            : formData.content.trim().split(/\s+/).length}
        </p>

        <button type="submit" className="save-btn">
          Save Note
        </button>
      </form>
    </div>
  );
}