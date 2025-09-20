import React from "react";

export const CustomLinkHeader = ({ children, onClick }) => {
  return (
    <a
      onClick={onClick}
      className="text-fuchsia-50 text-base font-bold hover:text-fuchsia-300 cursor-pointer"
    >
      {children}
    </a>
  );
};
