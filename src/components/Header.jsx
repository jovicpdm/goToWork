import React from "react";
import { Title } from "./../components/Title";
import { CustomLinkHeader } from "./CustomLinkHeader";

export const Header = ({children}) => {
  return (
    <div className="flex items-center gap-x-8 bg-fuchsia-900 m-0 py-8 px-16">
      <Title>GoToWork</Title>
      {children}
    </div>
  );
};
