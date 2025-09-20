import React, { useState } from "react";
import { CustomInput } from "./CustomInput";
import { SmText } from "./smText";
import { BaseText } from "./BaseText";
import LeadController from "../controller/LeadController";

export const CustomTableTr = ({ children, data, onUpdate }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleRowClick(row) {
    setSelectedRow(row);
    setOpen(true);
    setEmail(row.email);
    setStatus(row.status);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSave() {
    setLoading(true);
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const updatedLead = { ...selectedRow, email, status };
    await LeadController.updateLead(updatedLead);

    if (onUpdate) onUpdate(updatedLead);

    setLoading(false);
    setOpen(false);
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
        className={`fixed top-0 right-0 h-full w-1/3 bg-black shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold text-teal-200">Details</h2>
          <button className="text-white" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <form className="p-4 flex flex-col gap-2 border-2 border-gray-700">
          <SmText>name</SmText>
          <BaseText>{selectedRow?.name}</BaseText>
          <SmText>company</SmText>
          <BaseText>{selectedRow?.company}</BaseText>
          <SmText>email</SmText>
          <CustomInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={selectedRow?.email}
          />
          <SmText>source</SmText>
          <BaseText>{selectedRow?.source}</BaseText>
          <SmText>score</SmText>
          <BaseText>{selectedRow?.score}</BaseText>
          <SmText>status</SmText>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded px-2 py-1 bg-gray-800 text-white"
          >
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
            <option value="contacted">Contacted</option>
          </select>
          <button
            type="button"
            class="px-4 py-2 w-2/5 bg-cyan-700 text-white rounded-2xl mt-6
                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400
                    focus:ring-opacity-75 flex items-center justify-center disabled:opacity-50"
            onClick={handleSave}
          >
            {loading && (
              <span className="w-4 h-4 border-1 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "updating..." : "update"}
          </button>
        </form>
      </div>
    </>
  );
};
