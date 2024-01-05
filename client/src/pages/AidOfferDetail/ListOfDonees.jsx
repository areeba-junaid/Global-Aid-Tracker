import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const ListOfDonees = () => {
  const [donations] = useState([
    { doneeName: 'John Doe', amount: '100', time: '2023-01-01T12:00' },
    { doneeName: 'Jane Smith', amount: '200', time: '2023-01-02T14:30' },
    { doneeName: 'Alice Johnson', amount: '150', time: '2023-01-03T10:45' },
  ]);

  return (
    <div>

      <div className="sub-container bg-blue-300 rounded p-2 mt-4">
      <h2 className="text-gray font-bold text-center">LIST OF DONEES</h2> 
      </div>
      

        <table className="w-full border-collapse border bg-gray-200">
          <thead>
            <tr>
              <th className="border border-blue-300 p-2">Donee Name</th>
              <th className="border border-blue-300 p-2">Amount</th>
              <th className="border border-blue-300 p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donee, index) => (
              <tr key={index}>
                <td className="border border-blue-300 p-2">
                  <input
                    type="text"
                    name="doneeName"
                    value={donee.doneeName}
                    readOnly  // Set input field to read-only
                    className="field-input w-full px-2 py-1 bg-gray-300"
                  />
                </td>
                <td className="border border-blue-300 p-2">
                  <input
                    type="text"
                    name="amount"
                    value={donee.amount}
                    readOnly  // Set input field to read-only
                    className="field-input w-full px-2 py-1 bg-gray-300"
                  />
                </td>
                <td className="border border-blue-300 p-2">
                  <input
                    type="text"
                    name="time"
                    value={donee.time}
                    readOnly  // Set input field to read-only
                    className="field-input w-full px-2 py-1 bg-gray-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
      </div>
  );
};

export default ListOfDonees;
