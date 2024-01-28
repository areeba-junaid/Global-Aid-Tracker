import React from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

const DonationRecord = ({ record }) => {
  const columns = [
    {
      Header: <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Donor Address</div>,
      accessor: 'donor',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Amount</div>,
      accessor: 'amount',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Time</div>,
      accessor: 'timestamp',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
  ];
  const pageSizeOptions = record?.length < 10 ? [record?.length] : [5, 8, 10];
  const defaultPageSize = record?.length < 10 ? record?.length : 5;
  return (
    <div>
      <div className="sub-container bg-blue-300 rounded p-2 mt-4">
        <h2 className="text-gray font-bold text-center">DONATION RECORD</h2>
      </div>

      {record.length > 0 ? (
        <ReactTable
          data={record}
          columns={columns}
          defaultPageSize={defaultPageSize}
          pageSizeOptions={ pageSizeOptions}
        />
      ):(<p className="w-full text-center font-semibold p-1">
      No Request To show
    </p>)}
    </div>
  );
};

export default DonationRecord;
