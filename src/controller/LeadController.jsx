import dao from "../dao/LeadsDao";

const LeadController = {
  async loadLeads() {
    const leads = await dao.getAllLeads();
    return leads;
  },

  async sortLeadsByField(leadsArray, field, order = "desc") {
    return leadsArray.sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
  },

  async filterLeadsByStatus(leadsArray, status) {
    return leadsArray.filter((row) =>
      row.status.toLowerCase().includes(status.toLocaleLowerCase())
    );
  },

  async updateLead(updatedLead) {
    return await dao.updateLead(updatedLead);
  },
};

export default LeadController;
