//Aid Offer Page
// The final version with updations in UI (with both buttons) working/eiting/updating.
// approved one

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import ListOfDonees from '../Home/ListOfDonees';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGlobe, faPhone} from '@fortawesome/free-solid-svg-icons';


const AidOffers = () => {
  const [formData, setFormData] = useState({
    aidName: 'Medical supplies Donation',
    dateTime: '12/08/23 04:25 PM',
    aidInfo: 'Medical supplies donations play a crucial role in supporting healthcare initiatives, especially in underserved communities or during emergencies. By contributing items such as bandages, surgical gloves, and essential medications, donors can directly impact the well-being of those in need. ',
    aidType: 'Funds',
    amount: '15.00',
    offerLimit: '10',
    donorName: 'Jhon Stewards',
    country: 'United States',
    phoneno: '245 560098675', 
    totalRequest: '7',
    totalAccepted: '10',
    totalDonatedAmount: '25.01',
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
    
  const isFundsSelected = formData.aidType === 'Funds';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      console.log('Updating data:', formData);
      // Add logic to update data in the database
    } 

    setIsEditMode(false);

    
  };

  return (
    <div className="container max-w-8 mx-auto mt-10 mb-10 p-8 text-left rounded shadow relative">
      <h1 className="text-gray-600 font-bold text-center text-3xl">{isEditMode ? 'EDIT AID OFFER' : 'AID OFFER'}</h1>
      <br/>

      <form onSubmit={handleSubmit}>
      <div className="sub-container flex">
        <div className="flex-1 bg-gray-200 w-3/4 px-10 py-6 text-right border border-blue-300 rounded">

        <label className="flex items-center mb-4 ml-6">
          <span className="mr-2 font-bold">
            Aid Name:
          </span>
          <input
            type="text"
            name="name"
            value={formData.aidName}
            onChange={handleInputChange}
            required
            readOnly={!isEditMode}
            className="field-input w-3/4 px-2 py-1 rounded bg-gray-200"
          />
        </label>

        <label className="flex items-center mb-4 ml-6">
          <span className="mr-2 font-bold">
            Datetime:
          </span>
          <input
            type="text"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleInputChange}
            readOnly={!isEditMode}
            className="field-input w-3/4 px-2 py-1 rounded bg-gray-200"
          />
        </label>
        
        <label className="flex items-center mb-4 ml-6">
          <span className="mr-2 font-bold">
            Aid Type:
          </span>
          <select
            name="aidType"
            value={formData.aidType}
            onChange={handleInputChange}
            className="field-input w-3/4 px-2 py-1 rounded bg-gray-200"
          >
            <option value="Funds">Funds</option>
            <option value="Assets">Assets</option>
          </select>
        </label>

        {isFundsSelected && (
        <label className="flex items-center mb-4 ml-6">
          <span className="mr-2 font-bold">
            Amount:
          </span>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="field-input w-3/4 px-2 py-1 rounded bg-gray-200"
          />
        </label>
        )}

        <label className="flex items-center mb-4 ml-6">
          <span className="mr-2 font-bold">
            Offer Limit:
          </span>
          <input
            type="number"
            name="offerLimit"
            value={formData.amount}
            placeholder='Number of people'
            onChange={handleInputChange}
            className="field-input w-3/4 px-2 py-1 rounded bg-gray-200"
          />
        </label>
        
        <label className="flex items-center mb-4 ml-6">
          <span className="mr-2 font-bold">
            Aid Info: 
          </span>
          <textarea
            type="text"
            name="name"
            value={formData.aidInfo}
            onChange={handleInputChange}
            rows={3}
            required
            readOnly={!isEditMode}
            className="field-input w-3/4 px-2 py-1 rounded bg-gray-200"
          />
        </label>

        <span className="text-left">
          <h1 className="font-bold text-lg text-blue-400">Requests:</h1>
            <p className="bg-gray-300 p-2 rounded mb-2">By <strong>Lily Windsor:</strong>
            <br />
            <strong>Textbooks</strong> are required for students access to essential learning materials. Your generosity provides a foundation for knowledge and empowers individuals to pursue academic excellence. By supporting textbook donations, you directly impact students' educational journeys and contribute to a brighter and more equitable future.
            </p>
            <p className="bg-gray-300 p-2 rounded mb-2">By <strong>Jhon Williams:</strong>
            <br />
            <strong>Vaccines</strong> are urgently needed as donations to protect vulnerable populations and combat the spread of infectious diseases. Your contribution can make a significant impact on global health by ensuring access to essential immunization for those in need.
             </p>
        </span>

        </div>

        <div className='flex-2 bg-blue-300 w-1/4 px-10 py-6 text-right border-blue-300 rounded'>

        <label className="flex items-center mb-4">
          <span className="mr-2">
          <FontAwesomeIcon icon={faUser} />
          </span>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            readOnly
            className="field-input w-3/4 px-2 py-1 bg-blue-300 rounded"
          />
          </label>

          <label className="flex items-center mb-4">
          <span className="mr-2">
          <FontAwesomeIcon icon={faGlobe} />
          </span>
          <input
            type="text"
            name="country"
            value={formData.country}
            readOnly
            className="field-input w-3/4 px-2 py-1 bg-blue-300 rounded"
          />            
          </label>
      
          <label className="flex items-center mb-4">
          <span className="mr-2">
          <FontAwesomeIcon icon={faPhone} />
          </span>
          <input
            type="tel"
            name="phoneno"
            value={formData.phoneno}
            readOnly
            className="field-input w-3/4 px-2 py-1 bg-blue-300 rounded"
          />          
          </label>
          <br />
          <br />
        
          <label className="flex items-center mb-4 mt-60">
          <span className="mr-2 font-bold">
           Total Accepted:
          </span>
          <input
            type="number"
            name="totalAccepted"
            value={formData.totalAccepted}
            readOnly
            className="field-input w-1/4 px-2 py-1 bg-blue-300 rounded"
            />
          </label>

          <label className="flex items-center mb-4">
          <span className="mr-2 font-bold">
           Total Requests:
          </span>
          <input
            type="number"
            name="totalRequest"
            value={formData.totalRequest}
            readOnly
            placeholder="Offers"
            className="field-input w-1/4 px-2 py-1 bg-blue-300 rounded"
            />
          </label>

          <label className="flex items-center mb-4">
          <span className="mr-2 font-bold font-bold">
           Total Amount:
          </span>
          <input
            type="number"
            name="totalDonatedAmount"
            value={formData.totalDonatedAmount}
            readOnly
            placeholder="Offers"
            className="field-input w-1/4 px-2 py-1 bg-blue-300 rounded"
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

      <div>
        <ListOfDonees/>
      </div>

    </div>
  );
};

export default AidOffers;
