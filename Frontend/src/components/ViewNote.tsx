import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type Note = {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
};

export default function ViewNote() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [cookies] = useCookies(["token"]);
	const [note, setNote] = useState<Note | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!cookies.token) {
			navigate("/login");
			return;
		}

		if (!id) {
			setLoading(false);
			return;
		}

		const loadNote = async () => {
			try {
				const res = await axios.get(`http://localhost:8080/note/${id}`, {
					withCredentials: true,
				});

				if (res.data.success) {
					setNote(res.data.note);
				}
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					alert(error.response?.data?.message || "Failed to fetch note");
				} else {
					alert("Failed to fetch note");
				}
				navigate("/mynotes");
			} finally {
				setLoading(false);
			}
		};

		void loadNote();
	}, [cookies.token, id, navigate]);

	if (loading) {
		return <p className="empty-text">Loading note...</p>;
	}

	if (!note) {
		return <p className="empty-text">Note not found.</p>;
	}

	return (
		<div className="view-note-page">
			<div className="view-note-card">
				<h2 className="view-note-title">{note.title}</h2>
				<p className="view-note-date">
					Created on {new Date(note.createdAt).toLocaleString()}
				</p>
				<p className="view-note-content">{note.content}</p>

				<div className="view-note-actions">
					<button
						type="button"
						className="note-action-btn note-edit-btn"
						onClick={() => navigate(`/edit/${note._id}`)}
					>
						Edit Note
					</button>
					<button
						type="button"
						className="note-action-btn note-delete-btn"
						onClick={() => navigate("/mynotes")}
					>
						Back to My Notes
					</button>
				</div>
			</div>
		</div>
	);
}
