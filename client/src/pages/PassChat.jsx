import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import MessageInterface from "../components/MessageInterface";

const PassChat = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.userId;

  return (
    <>
      <Navbar />
      <MessageInterface
        apiUrl={import.meta.env.VITE_API_BASE_URL}
        contactId={contactId}
        userId={userId}
        onBack={() => navigate(-1)}
      />
    </>
  );
};

export default PassChat;
