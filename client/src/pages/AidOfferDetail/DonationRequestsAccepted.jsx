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
  const pageSizeOptions = data?.length < 10 ? [data?.length] : [5, 8, 10];
  const defaultPageSize = data?.length < 10 ? data?.length : 5;
  return (
    <div>
      <div className="sub-container bg-blue-300 rounded p-2 mt-4">
        <h2 className="text-gray font-bold text-center">
          DONATION REUESTS ACCEPTED
        </h2>
      </div>

      {data?.length !== 0 ? (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={defaultPageSize}
          pageSizeOptions={pageSizeOptions}
        />
      ) : (
        <p className="w-full text-center font-semibold p-1">
          No Request To show
        </p>
      )}
    </div>
  );
};

export default DonationRequestsAccepted;
