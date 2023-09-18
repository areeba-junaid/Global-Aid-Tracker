import React, { useState } from "react";

const Profile = () => {
  // Define state and event handlers if needed
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    country: "usa",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-3/5 profile-content bg-purple-700 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">John Doe</div>
          <div className="text-2xl font-bold">Global Aid Tracker</div>
        </div>

        <form id="profile-form">
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label htmlFor="account-no" className="text-white">
                <i className="fas fa-user"></i> Account Number:
              </label>
            </div>
            <div className="w-1/2">
              <input type="text" id="account-no" name="account-no" />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label htmlFor="email" className="text-white">
                <i className="fas fa-envelope"></i> Email:
              </label>
            </div>
            <div className="w-1/2">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-white text-purple-700 py-1 px-2 rounded"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label htmlFor="phone-no" className="text-white">
                <i className="fas fa-phone"></i> Phone Number:
              </label>
            </div>
            <div className="w-1/2">
              <input
                type="tel"
                id="phone-no"
                name="phone-no"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-white text-purple-700 py-1 px-2 rounded"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label htmlFor="country" className="text-white">
                <i className="fas fa-globe"></i> Country:
              </label>
            </div>
            <div className="w-1/2">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-white text-purple-700 py-1 px-2 rounded"
              >
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                {/* Add more options here */}
              </select>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label htmlFor="user-type" className="text-white">
                User Type:
              </label>
            </div>
            <div className="w-1/2">
              <select
                id="user-type"
                name="user-type"
                disabled
                className="bg-white text-purple-700 py-1 px-2 rounded"
              >
                <option value="donor">Donor</option>
                <option value="donee">Donee</option>
              </select>
            </div>
          </div>
        </form>

        <div className="donation-stats">
          <p>
            Donations Given: <span id="donations-given">100</span>
          </p>
          <p>
            Donations Accepted: <span id="donations-accepted">50</span>
          </p>
        </div>

        <div className="button-container">
          {isEditing ? (
            <>
              <button
                id="save-button"
                onClick={handleSave}
                className="bg-white text-green-500 hover:text-purple-600 hover:bg-purple-200 py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                id="edit-button"
                disabled
                className="bg-white text-green-500 hover:text-purple-600 hover:bg-purple-200 py-2 px-4 rounded"
              >
                Edit
              </button>
            </>
          ) : (
            <button
              id="edit-button"
              onClick={handleEdit}
              className="bg-white text-green-500 hover:text-purple-600 hover:bg-purple-200 py-2 px-4 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
