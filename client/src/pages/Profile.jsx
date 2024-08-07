import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../utils/FirebaseConfig";
import "../assets/Profile.css";
import { jwtDecode } from "jwt-decode";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/Navbar";

import { userIcon } from "../Constants";
import { logout } from "../utils/Auth";

const Profile = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState({});
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const { userId } = jwtDecode(token);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiUrl}/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setOriginalUser(data);
        setProfilePictureUrl(data.profilePicture);
      } else {
        console.error(data.message);
      }
    };
    fetchUserDetails();
  }, [userId, token]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const fileRef = ref(storage, `profilePictures/${file.name}`);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      setProfilePictureUrl(downloadURL);
      setUser((prevState) => ({ ...prevState, profilePicture: downloadURL }));

      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/profile/${userId}/picture`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profilePicture: downloadURL }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Profile picture updated successfully!");
      } else {
        alert(data.message || "Error updating profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture", error);
    }
  };

  const handleSave = async () => {
    try {
      const emailChanged = user.email !== originalUser.email;
      const passwordChanged = user.password !== originalUser.password;
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/profile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        setOriginalUser(user);
        if (emailChanged || passwordChanged) {
          logout();
        } else {
          setIsEditing(false);
          navigate("/");
        }
      } else {
        alert(data.message || "Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleCancel = () => {
    setUser(originalUser);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <h2>User Profile</h2>
        <div className="profile-picture">
          <img src={profilePictureUrl || userIcon} alt="Profile" />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
        <div className="profile-details">
          <label>
            First Name:
            <p>{user.firstName}</p>
          </label>
          <label>
            Last Name:
            <p>{user.lastName}</p>
          </label>
          <label>
            Email:
            {isEditing ? (
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            ) : (
              <p>{user.email}</p>
            )}
          </label>
          <label>
            Phone Number:
            {isEditing ? (
              <input
                type="text"
                value={user.phoneNumber}
                onChange={(e) =>
                  setUser({ ...user, phoneNumber: e.target.value })
                }
              />
            ) : (
              <p>{user.phoneNumber}</p>
            )}
          </label>
          <label>
            Password:
            {isEditing ? (
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            ) : (
              <p>••••••••</p>
            )}
          </label>
        </div>
        {isEditing ? (
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </>
  );
};

export default Profile;
