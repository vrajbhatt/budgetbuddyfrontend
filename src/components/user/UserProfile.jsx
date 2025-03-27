
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'

export const UserProfile = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const userId = localStorage.getItem("id"); // Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    axios
      .get(`/user/${userId}`) // Fetch logged-in user details
      .then((res) => {
        console.log("User Data:", res.data);
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setError("Failed to load user data.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading user details...</p>; // Show loading message
  if (error) return <p>{error}</p>; // Show error message
  return (
    <div>
    <h2>My Profile</h2>
    {user ? (
      <table border="1" cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            <td>Profile Image</td>
            <td>
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  width="50"
                  height="50"
                  onError={(e) => (e.target.style.display = "none")} // Hide broken images
                />
              ) : (
                "No Image"
              )}
            </td>
          </tr>
          <tr>
            <td>Full Name</td>
            <td>{user.firstName} {user.lastName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{user.age ? user.age : "N/A"}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>{user.role}</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <p>User not found.</p>
    )}
  </div>
);
};