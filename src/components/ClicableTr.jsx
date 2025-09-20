import React, { useState } from "react";
import { CustomInput } from "./CustomInput";
import { SmText } from "./smText";
import { BaseText } from "./BaseText";

export const CustomTableTr = ({ children, data }) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  function handleRowClick(row) {
    setSelectedRow(row);
    setOpen(true);
  }

  return (
    <>
      <tr
        className="border-b text-teal-50 cursor-pointer hover:bg-gray-900 hover:text-gray-50"
        onClick={() => {
          handleRowClick(data);
        }}
      >
        {children}
      </tr>
      {open && (
        <div
          className="fixed inset-0 bg-gray-700
           opacity-70"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-black shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-semibold text-teal-200">Details</h2>
          <button className="text-white" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <form className="p-4 flex flex-col gap-4">
          <SmText>name</SmText>
          <BaseText>{selectedRow?.name}</BaseText>
          <SmText>company</SmText>
          <BaseText>{selectedRow?.company}</BaseText>
          <SmText>email</SmText>
          <CustomInput
            value={selectedRow?.email}
            onChange={() => {}}
            placeholder={selectedRow?.email}
          />
          <SmText>source</SmText>
          <BaseText>{selectedRow?.source}</BaseText>
          <SmText>score</SmText>
          <BaseText>{selectedRow?.score}</BaseText>
          <SmText>status</SmText>
          <CustomInput
            value={selectedRow?.status}
            onChange={() => {}}
            placeholder={selectedRow?.status}
          />
        </form>
      </div>
    </>
  );
};
