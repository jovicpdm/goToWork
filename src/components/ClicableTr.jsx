import React, { useState } from "react";
import { CustomInput } from "./CustomInput";
import { SmText } from "./smText";
import { BaseText } from "./BaseText";
import LeadController from "../controller/LeadController";
import OpportunityController from "../controller/OpportunityController";

export const CustomTableTr = ({ children, data, onUpdate }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [stage, setStage] = useState("new");
  const [amount, setAmount] = useState("");
  const [accountName, setAccountName] = useState("");

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

  async function handleSaveOpportunity() {
    const newOpportunity = {
      id: Date.now().toString(), // gera id único
      name: selectedRow?.name,
      stage,
      amount: amount || null,
      accountName,
    };

    await OpportunityController.createOpportunity(newOpportunity);

    setOpenModal(false);
    setStage("new");
    setAmount("");
    setAccountName("");
  }

  return (
    <>
      <tr
        className="border-b text-fuchsia-50 cursor-pointer hover:bg-fuchsia-950 hover:text-fuchsia-50"
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
        <form className="p-4 flex flex-col gap-2 border-2 border-fuchsia-800 rounded-4xl m-2">
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
            className="rounded px-2 py-1 bg-fuchsia-900 text-white"
          >
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
            <option value="contacted">Contacted</option>
          </select>
          <div className="flex justify-around">
            <button
              type="button"
              class="px-4 py-2 w-2/5 bg-fuchsia-900 text-white rounded-2xl mt-6
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400
            focus:ring-opacity-75 flex items-center justify-center disabled:opacity-50"
              onClick={handleSave}
            >
              {loading && (
                <span className="w-4 h-4 border-1 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "updating..." : "update"}
            </button>
            <button
              type="button"
              class="px-4 py-2 w-2/5 bg-fuchsia-900 text-white rounded-2xl mt-6
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400
            focus:ring-opacity-75 flex items-center justify-center disabled:opacity-50"
              onClick={() => setOpenModal(true)}
            >
              + Opportunity
            </button>
          </div>
        </form>
        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-xl w-2/3">
              <h2 className="text-xl font-semibold text-teal-200 mb-4">
                Create Opportunity
              </h2>

              <SmText>Name</SmText>
              <BaseText>{selectedRow?.name}</BaseText>

              <SmText>Stage</SmText>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="rounded px-2 py-1 bg-fuchsia-900 text-white w-full"
              >
                <option value="new">New</option>
                <option value="qualification">Qualification</option>
                <option value="proposal">Proposal</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>

              <SmText>Amount (optional)</SmText>
              <CustomInput
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNaN(value)) {
                    alert("only numbers");
                    setAmount("");
                  } else {
                    setAmount(value);
                  }
                }}
                placeholder="Enter amount"
              />

              <SmText>Account Name</SmText>
              <CustomInput
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter account name"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-fuchsia-900 text-white rounded"
                  onClick={handleSaveOpportunity}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
