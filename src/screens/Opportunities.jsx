// pages/OpportunitiesPage.jsx
import React, { useEffect, useState } from "react";
import OpportunityController from "../controller/OpportunityController";

export const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOpportunities() {
    setLoading(true);
    const data = await OpportunityController.getAllOpportunities();
    setOpportunities(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    await OpportunityController.deleteOpportunity(id);
    await loadOpportunities();
  }

  useEffect(() => {
    loadOpportunities();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-teal-200 mb-6">Opportunities</h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : opportunities.length === 0 ? (
        <p className="text-gray-400">No opportunities found</p>
      ) : (
        <table className="w-full text-left border border-fuchsia-700">
          <thead className="bg-fuchsia-900 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Stage</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Account</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr
                key={opp.id}
                className="border-b border-fuchsia-800 text-fuchsia-50 hover:bg-fuchsia-950"
              >
                <td className="px-4 py-2">{opp.id}</td>
                <td className="px-4 py-2">{opp.name}</td>
                <td className="px-4 py-2">{opp.stage}</td>
                <td className="px-4 py-2">
                  {opp.amount ? `$${opp.amount}` : "-"}
                </td>
                <td className="px-4 py-2">{opp.accountName}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(opp.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
