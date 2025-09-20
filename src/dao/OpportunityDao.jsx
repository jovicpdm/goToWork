// dao/opportunityDao.js
const STORAGE_KEY = "opportunities";

const OpportunityDao = {
  async getAll() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return data;
  },

  async getById(id) {
    const data = await this.getAll();
    return data.find((item) => item.id === id) || null;
  },

  async create(opportunity) {
    const data = await this.getAll();
    data.push(opportunity);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return opportunity;
  },

  async update(opportunity) {
    const data = await this.getAll();
    const index = data.findIndex((item) => item.id === opportunity.id);
    if (index !== -1) {
      data[index] = opportunity;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return opportunity;
    }
    return null;
  },

  async delete(id) {
    const data = await this.getAll();
    const filtered = data.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};

export default OpportunityDao;
