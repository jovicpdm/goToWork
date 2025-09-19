import leadsData from "../data/leads.json";

const latency = Math.random() * (5000 - 100) + 100;

const simulatedLatency = (data) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, latency)
  );
};

const dao = {
  async getAllLeads() {
    return simulatedLatency(leadsData);
  },
  async getLeadById(id) {
    const lead = leadsData.find((lead) => lead.id === id);
    return simulatedLatency(lead) || null;
  },
};

export default dao;
