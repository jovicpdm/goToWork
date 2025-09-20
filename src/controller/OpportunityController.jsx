// controllers/OpportunityController.js
import opportunityDao from "../dao/OpportunityDao";

const OpportunityController = {
  async getAllOpportunities() {
    return await opportunityDao.getAll();
  },

  async createOpportunity({ name, stage, amount, accountName }) {
    const newOpportunity = {
      id: `opp-${Date.now()}`, // id único
      name,
      stage,
      amount: amount || null,
      accountName,
    };

    return await opportunityDao.create(newOpportunity);
  },

  async updateOpportunity(opportunity) {
    return await opportunityDao.update(opportunity);
  },

  async deleteOpportunity(id) {
    return await opportunityDao.delete(id);
  },
};

export default OpportunityController;
