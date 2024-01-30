import React from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

const ListOfDonees = ({ requestedBy, handleAcceptRequest, isDonor }) => {

  const data = requestedBy?.map((item) => ({
    doneeName: item.donee.name,
    proposal: item.proposal,
    accountAddress: item.donee.accountNo,
    acceptButton: 'Accept',
  }));
  
  let columns = [
    {
      Header: <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Donee Name</div>,
      accessor: 'doneeName',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Donation Proposals</div>,
      accessor: 'proposal',
      Cell: ({ value }) => (
        <div style={{ whiteSpace: 'pre-wrap', maxHeight: '100px', overflowY: 'auto' }}>
          {value}
        </div>
      ),
    },
    {
      Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Account Addresss</div>,
      accessor: 'accountAddress',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
  ];

  
  if (isDonor) {
    columns = [
      ...columns,
      {
        Header: () => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Accept Request</div>,
        accessor: 'acceptButton',
        Cell: ({ original }) => (
          <div style={{ textAlign: 'center' }}>
            <button
              className="bg-green-700 hover:bg-green-600 rounded shadow self-center text-white p-2 w-4/12 mt-5"
              type="button"
              onClick={() => handleAcceptRequest(original)}
            >
              Accept
            </button>
          </div>
        ),
      },
    ];
  }

  
  return (
    <div>
      <div className="sub-container bg-blue-300 rounded p-3 mt-4">
        <h2 className="text-gray font-bold text-center">PENDING DONATION OFFERS RECORD</h2>
      </div>

      {data?.length !== 0 ? (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={3}
          pageSizeOptions={[3,5]}
        />
      ) : (
        <p className="w-full text-center font-semibold p-1">No Request To show</p>
      )}
    </div>
  );
};

export default ListOfDonees;
