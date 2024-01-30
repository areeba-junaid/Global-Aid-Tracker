import React, { useState } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const DonationRequestsAccepted = ({ acceptedDonee, amount }) => {
  const columns = [
    {
      Header: (
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          Donee Name
        </div>
      ),
      accessor: "doneeName",
      Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Amount</div>
      ),
      accessor: "amount",
      Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          Account Adress
        </div>
      ),
      accessor: "accountAddress",
      Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
    },
  ];

  const data = acceptedDonee?.map((item) => ({
    doneeName: item.donee.name,
    amount: amount,
    accountAddress: item.donee.accountNo,
  }));
 
  return (
    <div>
      <div className="sub-container bg-blue-300 rounded p-3 mt-4">
        <h2 className="text-gray font-bold text-center">
          ACCEPTED DONATION OFFERS RECORD
        </h2>
      </div>

      {data?.length !== 0 ? (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={3}
          pageSizeOptions={[3,5]}
        />
      ) : (
        <p className="w-full text-center font-semibold p-1">
          No Accepted  To show
        </p>
      )}
    </div>
  );
};

export default DonationRequestsAccepted;
