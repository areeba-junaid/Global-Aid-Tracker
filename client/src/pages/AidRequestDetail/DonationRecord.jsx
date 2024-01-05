import React, { useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';


const DonationRecord = () => {
  const [donations] = useState([
    { donorName: 'John Williams', amount: '100', time: '2023-01-01T12:00' },
    { donorName: 'Smith Sinclair', amount: '200', time: '2023-01-02T14:30' },
    { donorName: 'Alice Johnson', amount: '150', time: '2023-01-03T10:45' },
    { donorName: 'John Williams', amount: '100', time: '2023-01-01T12:00' },
    { donorName: 'Smith Sinclair', amount: '200', time: '2023-01-02T14:30' },
    { donorName: 'Alice Johnson', amount: '150', time: '2023-01-03T10:45' },
    { donorName: 'John Williams', amount: '100', time: '2023-01-01T12:00' },
    { donorName: 'Smith Sinclair', amount: '200', time: '2023-01-02T14:30' },
    { donorName: 'Alice Johnson', amount: '150', time: '2023-01-03T10:45' },
  ]);

  const columns = [
    {
      Header: <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Donor Name</div>,
      accessor: 'donorName',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Amount</div>,
      accessor: 'amount',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Time</div>,
      accessor: 'time',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
  ];

  return (
    <div>
      <div className="sub-container bg-blue-300 rounded p-2 mt-4">
        <h2 className="text-gray font-bold text-center">DONATION RECORD</h2>
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

export default DonationRecord;
