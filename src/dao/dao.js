import leadsData from "../data/leads.json";

const latency = Math.random() * (5000 - 100) + 100;

const simulatedLatency = (data) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, latency)
  );
};

const STORAGE_KEY = "leads";

const initializeStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leadsData));
  }
};

const dao = {
  async getAllLeads() {
    initializeStorage();
    const leads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return simulatedLatency(leads);
  },

  async getLeadById(id) {
    initializeStorage();
    const leads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const lead = leads.find((lead) => lead.id === id);
    return simulatedLatency(lead || null);
  },

  async addLead(newLead) {
    initializeStorage();
    const leads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    leads.push(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    return simulatedLatency(newLead);
  },

  async updateLead(updatedLead) {
    initializeStorage();
    const leads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const index = leads.findIndex((lead) => lead.id === updatedLead.id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updatedLead };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      return simulatedLatency(leads[index]);
    }
    return simulatedLatency(null);
  },

  async deleteLead(id) {
    initializeStorage();
    let leads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    leads = leads.filter((lead) => lead.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    return simulatedLatency(true);
  },
};

export default dao;
