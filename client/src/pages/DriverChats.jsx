import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import MessageInterface from "../components/MessageInterface";

const DriverChats = () => {
  const navigate = useNavigate();
  const [contactId, setContactId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/contacts/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.length > 0) {
          setContactId(data[0]._id);
        }

        setError("");
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.userId;

  return (
    <>
      <Navbar contactId={contactId} />
      <MessageInterface
        apiUrl={import.meta.env.VITE_API_BASE_URL}
        contactId={contactId}
        userId={userId}
        onBack={() => navigate(-1)}
      />
    </>
  );
};

export default DriverChats;
