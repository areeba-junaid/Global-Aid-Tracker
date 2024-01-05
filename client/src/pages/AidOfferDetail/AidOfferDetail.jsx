// Specific Aid Offer Page
//the final one with professional UI 

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import ListOfDonees from "../AidRequestDetail/DonationRecord";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,  
  faGlobe, 
  faPhone, 
  faMedkit,        // Medical icon
  faClock,         // Time icon
} from '@fortawesome/free-solid-svg-icons';


const AidOfferDetail = () => {
  const [formData, setFormData] = useState({
    donorName: 'Wiiliam Alexander',
    country: 'United Kingdom',
    phoneno: '345 2677801',
    totalAccepted: '10',
    totalRequest: '15',
    totalDonatedAmount: '25',
    prposals: '',   
  });

  const handleSubmit = (e) => {
    e.preventDefault();

   console.log('Saving proposals data:', formData);
      // Add logic to save data in the database

    setFormData({
      prposals: '',    
    });
    const aidType = 'Funds';

  };

  return (

    <div className="container max-w-8 mx-auto mt-10 mb-10 p-4 text-left rounded shadow relative">
      <h1 className="text-gray-800 text-3xl font-bold text-center mb-3">SPECIFIC AID OFFER</h1>

      <div className='flex'>
        <div className='flex-1 bg-gray-200 w-3/4 px-6 py-6 rounded border border-blue-300'>
          <p>
          <span className="text-left">
          <h2 className="font-bold text-xl text-left bg-gray-300 p-2"> <FontAwesomeIcon icon={faMedkit} /> Medical Supplies Donation</h2>
          </span>
          <span className="text-right">
          <h2 className="font-bold text-xl text right bg-gray-300 p-2"> <FontAwesomeIcon icon={faClock} /> 12/08/23 04:25 PM</h2></span>
          </p>
          <br/>
          <p><strong>Medical supplies donations</strong> play a crucial role in supporting healthcare initiatives, especially in underserved communities or during emergencies. By contributing items such as bandages, surgical gloves, and essential medications, donors can directly impact the well-being of those in need.</p>
          <br />
          <p>Offer is limited to <strong>20</strong> people.</p>
          <br />
          <p><strong>Aid Type:</strong> Funds.  &nbsp;&nbsp;  Amount Donated is <strong>20.01 Ethers</strong></p>
          <br />
          
          <form onSubmit={handleSubmit}>
            <label className="font-bold">
              Proposals:
                <textarea
                  type="text"
                  name="prposals"
                  value={formData.prposals}
                  placeholder='write your proposals here...'
                  required
                  rows={4}
                  className="field-input w-full ml-2 px-2 py-1 rounded font-normal"
                />
            </label>
            <div className="text-right">
              <button className="save-btn bg-blue-700 rounded shadow text-white p-1 px-4 m-1"
                type="submit">Save
              </button>
            </div>
          </form>
        </div>


        <div className='flex-2 bg-blue-300 w-1/4 px-10 py-6 text-right rounded'>

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
        
          <label className="flex items-center mb-4 mt-40">
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

      <div>
        <ListOfDonees/> 
      </div>
    </div>

  );
};

export default AidOfferDetail;