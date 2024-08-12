import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import MessageInterface from "../components/MessageInterface";
import { logo2 } from "../Constants";

const DriverChats = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContacts, setShowContacts] = useState(true);
  const [error, setError] = useState("");

  const toggleContacts = () => {
    setShowContacts((prevShowContacts) => !prevShowContacts);
  };

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

        if (response.ok) {
          setContacts(data);
          if (data.length > 0) {
            setSelectedContactId(data[0]._id);
          }
          setError("");
        } else {
          setError("Failed to fetch contacts");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch contacts");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="driver-container">
      <Navbar image={logo2} />
      <div className="chat-interface">
        <div className="contacts-toggle">
          <button onClick={toggleContacts}>
            {showContacts ? "Hide Contacts" : "Show Contacts"}
          </button>
        </div>

        {showContacts && (
          <div className="chats-container">
            <h2 className="chats-title">Contacts</h2>
            <ul className="contacts-list">
              {contacts.map((contact) => (
                <li
                  key={contact._id}
                  onClick={() => setSelectedContactId(contact._id)}
                  className={`contact-item ${
                    selectedContactId === contact._id ? "selected" : ""
                  }`}
                >
                  {`${contact.firstName} has sent you a message`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedContactId && (
        <MessageInterface
          apiUrl={import.meta.env.VITE_API_BASE_URL}
          contactId={selectedContactId}
          userId={jwtDecode(localStorage.getItem("token")).userId}
          onBack={() => navigate(-1)}
        />
      )}
    </div>
  );
};

export default DriverChats;
