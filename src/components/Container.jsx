import React from "react";

export const Container = ({ children }) => {
  return (
    <div
      className="
            flex 
            flex-col 
            min-h-screen
            min-w-screen
            w-full
            bg-gray-950
            p-8"
    >
      {children}
    </div>
  );
};
