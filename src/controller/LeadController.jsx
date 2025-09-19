import dao from "../dao/dao";

const LeadController = {
  async loadLeads() {
    const leads = await dao.getAllLeads();
    console.log(leads);
    return leads;
  },

  async sortLeadsByField(field, ascending = true) {
    const leads = await dao.getAllLeads();

    leads.sort((a, b) => {
      if (!a[field] || !b[field]) return 0;
    })
  },
};

export default LeadController;
