import React, { useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';


const DonationRequestsAccepted = () => {
  const [donations] = useState([
    { doneeName: 'John Williams', amount: '100', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Smith Sinclair', amount: '200', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Alice Johnson', amount: '150', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'John Williams', amount: '100', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Smith Sinclair', amount: '200', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Alice Johnson', amount: '150', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'John Williams', amount: '100', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Smith Sinclair', amount: '200', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
    { doneeName: 'Alice Johnson', amount: '150', accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
  ]);

  const columns = [
    {
      Header: <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Donee Name</div>,
      accessor: 'doneeName',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Amount</div>,
      accessor: 'amount',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Account Adress</div>,
      accessor: 'accountAddress',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
  ];

  return (
    <div>
      <div className="sub-container bg-blue-300 rounded p-2 mt-4">
        <h2 className="text-gray font-bold text-center">DONATION REUESTS ACCEPTED</h2>
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

export default DonationRequestsAccepted;
