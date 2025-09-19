import { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Title } from "./components/Title";
import { CustomTableHead } from "./components/CustomTableHead";

import LeadController from "./controller/LeadController";
import { CustomTableBody } from "./components/CustomTableBody";
import { CustomInput } from "./components/CustomInput";

function App() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const tableTitles = [
    "Id",
    "Name",
    "Company",
    "Email",
    "Source",
    "Score",
    "Status",
  ];

  async function fetchLeads() {
    const loadedLeads = await LeadController.loadLeads();
    setLeads(loadedLeads);
    setFilteredLeads(loadedLeads);
    setIsLoading(false);
  }

  async function searchByName(data) {
    const filteredData = leads.filter((row) =>
      row.name.toLowerCase().includes(search.toLocaleLowerCase())
    );

    setFilteredLeads(filteredData);
  }

  async function searchByCompany(data) {
    const filteredData = leads.filter((row) =>
      row.company.toLowerCase().includes(search.toLocaleLowerCase())
    );

    setFilteredLeads(filteredData);
  }

  async function showSearch(value, searchParam) {
    value.length === 0
      ? setFilteredLeads(leads)
      : searchParam == "name"
      ? searchByName(searchParam)
      : searchByCompany(searchParam);
  }

  async function sortByField(field) {
    const sortedLeads = await LeadController.sortLeadsByField(field);
    setFilteredLeads(sortedLeads);
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <Container>
      <Title>GoToWork</Title>
      <button
        class="px-4 py-2 w-1/7 bg-cyan-700 text-white rounded-2xl mt-6
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400
                   focus:ring-opacity-75"
        onClick={() => setShowFilter(!showFilter)}
      >
        Filter
      </button>
      {showFilter == false ? null : (
        <div className="mt-8 flex flex-row gap-4 justify-start width-full items-center">
          <CustomInput
            placeholder={"Search by name..."}
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              showSearch(value, "name");
            }}
          />
          <CustomInput
            placeholder={"Search by company..."}
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              showSearch(value, "company");
            }}
          />
          <p className="text-white">Ordenar por: </p>
          <select
            className="rounded-2xl px-4 py-2 bg-gray-800 text-white"
            onChange={(e) => {
              sortByField(e.target.value, );
            }}
          >
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="email">Email</option>
            <option value="source">Source</option>
            <option value="score">Score</option>
            <option value="status">Status</option>
          </select>
        </div>
      )}
      <table className="table-fixed mt-8 row-auto">
        <CustomTableHead headTitles={tableTitles} />
        <CustomTableBody data={filteredLeads} isLoading={isLoading} />
      </table>
    </Container>
  );
}

export default App;
