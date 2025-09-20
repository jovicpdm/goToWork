import React from "react";

export const CustomTableHead = ({ headTitles, sortBy, sortOrder, onSort }) => {
  return (
    <thead className="bg-fuchsia-950 text-gray-200">
      <tr>
        {headTitles.map((title, index) => (
          <th key={index} className="px-4 py-2 text-left">
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};
