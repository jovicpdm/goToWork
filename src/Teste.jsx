import React from "react";
import LeadController from "./controller/LeadController";

const Teste = () => {
  return (
    <div>
      <button
        onClick={LeadController.sortLeadsByNameAsc}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Testar
      </button>
    </div>
  );
};

export default Teste;
