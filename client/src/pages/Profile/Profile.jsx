import React, { useState } from "react";

const Profile = () => {
  // Define state and event handlers if needed
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    accountno: "12345", // Sample initial values
    email: "johndoe@example.com", // Sample initial values
    "phone-no": "555-555-5555", // Sample initial values
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
    <>
      <h2 className="font-bold text-center mt-4 text-black text-2xl mb-4">
        Profile
      </h2>

      <form
        className="bg-gray-800 w-2/5 border rounded m-auto p-2 display flex flex-col"
        id="profile-form"
      >
        <div className="text-2xl font-bold text-white ">John Doe</div>
        <div className="flex items-center mb-4 mt-5">
          <label htmlFor="accountno" className="text-white w-2/12">
            <i className="fas fa-user"></i> Account No:
          </label>
          <input
            type="text" // Change type to text
            id="accountno"
            name="accountno"
            value={formData.accountno}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-white w-full text-purple-700 py-1 px-2 rounded"
          />
        </div>
        <div className="flex flex-row items-center mb-4">
          <label htmlFor="email" className="w-2/12 text-white">
            <i className="fas fa-envelope"></i> Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-white w-full text-purple-700 py-1 px-2 rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="phone-no" className="text-white w-2/12">
            <i className="fas fa-phone"></i> Phone NO:
          </label>
          <input
            type="tel"
            id="phone-no"
            name="phone-no"
            value={formData["phone-no"]}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full bg-white text-purple-700 py-1 px-2 rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="country" className="w-2/12 text-white">
            <i className="fas fa-globe"></i> Country:
          </label>
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
        <div className="flex items-center mb-3">
          <label htmlFor="user-type" className="w-2/12 text-white">
            User Type:
          </label>
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

        <div className="text-white donation-stats">
          <p>
            Donations Given: <span id="donations-given">100</span>
          </p>
          <p>
            Donations Accepted: <span id="donations-accepted">50</span>
          </p>
        </div>
      </form>
      <div className="button-container flex flex-row justify-center space-x-6 pb-5 mt-5">
        {isEditing ? (
          <>
            <button
              id="save-button"
              onClick={handleSave}
              className="bg-black text-white hover:text-purple-600 hover:bg-purple-200 py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              id="edit-button"
              disabled
              className="bg-black text-white hover:text-purple-600 hover:bg-purple-200 py-2 px-4 rounded"
            >
              Edit
            </button>
          </>
        ) : (
          <button
            id="edit-button"
            onClick={handleEdit}
            className="bg-black text-white hover:text-purple-600 hover:bg-purple-200 py-2 px-4 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
};

export default Profile;
