import React, { useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';


const ListOfDonees = () => {
  const [donations] = useState([
    { doneeName: 'John Williams', proposal: 'Needed vaccinations for Pandemic', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Smith Sinclair', proposal: 'Needed Books for a free School', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Alice Johnson', proposal: 'Funds Required for emergency Situation', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'John Williams', proposal: 'In need of Food for 10 people', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Smith Sinclair', proposal: 'I need funds for my medicines', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Alice Johnson', proposal: 'I need help to continue my studies', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'John Williams', proposal: 'Need meicines for treatment', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Smith Sinclair', proposal: 'In need of money for my Bills payment', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Alice Johnson', proposal: 'Study Aid Required', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
  ]);

  const columns = [
    {
      Header: <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Donee Name</div>,
      accessor: 'doneeName',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Donation Proposals</div>,
      accessor: 'proposal',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Account Adress</div>,
      accessor: 'accountAddress',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Accept Request</div>,
      accessor: 'acceptButton', // Use a unique accessor for the button column
      Cell: ({ original }) => (
        <div style={{ textAlign: 'center' }}>
          <button 
          className="bg-green-700  hover:bg-green-600 rounded shadow self-center text-white p-2 w-4/12 mt-5"
          type="submit"
          onClick={() => handleAccept(original)}>Accept</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="sub-container bg-blue-300 rounded p-2 mt-4">
        <h2 className="text-gray font-bold text-center">DONATION REUESTS</h2>
      </div>

      {donations.length > 0 && (
        <ReactTable
          data={donations}
          columns={columns}
          defaultPageSize={10}
          pageSizeOptions={[5, 8, 10]}
          keyExtractor={(item) => item.time} // Use a unique identifier for each row
        />
      )}
    </div>
  );
};

export default ListOfDonees;
