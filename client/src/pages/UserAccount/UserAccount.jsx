//UserAccount Page
// The final version with updations in UI (with both buttons) working/eiting/updating.
// approved one

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faGlobe, faPhone, faCreditCard} from '@fortawesome/free-solid-svg-icons';


const UserAccount = () => {
  const [formData, setFormData] = useState({
    name: 'Alex Willson',
    email: 'alexwillson@gmail.com',
    country: 'United States',
    phoneno: '245 560098675',
    accountNumber: '1234567890',    
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
    

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      console.log('Updating data:', formData);
      // Add logic to update data in the database
    } 

    setIsEditMode(false);
  };

  return (
    <div className="container max-w-3xl mx-auto mt-10 mb-10 p-8 text-left rounded shadow relative">
      <h1 className="text-gray-600 font-bold text-center text-3xl">{isEditMode ? 'EDIT PERSONAL INFORMATION' : 'PERSONAL ACCOUNT INFORMATION'}</h1>
      <br/>
      
      

      <div className="bg-blue-300 px-4 py-3">
        <label className="flex items-center">
        <span className="mr-2">
        <FontAwesomeIcon icon={faCreditCard} />
        </span>
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleInputChange}
          placeholder="Enter your account number"
          maxLength="20" // Set a maximum length for the account number
          pattern="[0-9]{1,20}" // Allow only digits, and between 1 and 20 characters
          title="Please enter a valid account number"
          readOnly
          className="field-input bg-blue-300 w-3/4 px-2 py-1"
        />
        </label>
      </div>

      <form onSubmit={handleSubmit}>
      <div className="sub-container flex bg-gray-200 border border-blue-300 rounded px-8 py-8 mb-8">
        <div className="flex-1">
        <label className="flex items-center mb-4">
          <span className="mr-2">
          <FontAwesomeIcon icon={faUser} />
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            readOnly={!isEditMode}
            className="field-input w-3/4 px-2 py-1 rounded"
          />
        </label>
        <br />
        <label className="flex items-center mb-4">
          <span className="mr-2">
          <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            readOnly={!isEditMode}
            className="field-input w-3/4 px-2 py-1 rounded"
          />
        </label>
        </div>

        <div className="flex-2">
        <label className="flex items-center mb-4">
          <span className="mr-2">
          <FontAwesomeIcon icon={faGlobe} />
          </span>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            readOnly={!isEditMode}
            className="field-input w-3/4 px-2 py-1 rounded"
          >            
            {[
                'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
                'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
                'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
                'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
                'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic',
                'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Côte d’Ivoire',
                'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
                'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini',
                'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany',
                'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
                'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
                'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
                'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
                'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar',
                'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
                'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
                'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
                'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay',
                'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
                'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
                'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
                'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
                'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
                'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
                'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
              ].map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
          </select>
        </label>
        <br/>
        <label className="flex items-center mb-4">
          <span className="mr-2">
          <FontAwesomeIcon icon={faPhone} />
          </span>
          <input
            type="tel"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleInputChange}
            maxLength={13}
            title="Please enter a valid 10-digit phone number"
            readOnly={!isEditMode}
            required
            className="field-input w-3/4 px-2 py-1 rounded"
          />          
        </label>
        </div>
      </div>

        <div className="text-left">
        <button className="save-btn bg-blue-500 rounded shadow text-white p-1 px-4 m-1"
        type="submit">Save
        </button>
        </div>
      </form>

      <div className="text-right">
      <button className="save-btn bg-blue-500 rounded shadow text-white p-1 px-4 m-1"
      onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? 'Cancel Edit' : 'Edit'}
      </button>
      </div>
    </div>
  );
};

export default UserAccount;
