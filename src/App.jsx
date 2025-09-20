import { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { CustomLinkHeader } from "./components/CustomLinkHeader";
import { Leads } from "./screens/Leads";
import { Opportunities } from "./screens/Opportunities";

function App() {
  const [screen, setScreen] = useState("leads");

  return (
    <>
      <Header>
        <CustomLinkHeader onClick={() => setScreen("leads")}>
          Leads
        </CustomLinkHeader>
        <CustomLinkHeader onClick={() => setScreen("opportunities")}>
          Opportunities
        </CustomLinkHeader>
      </Header>
      <Container>
        {screen === "leads" ? <Leads /> : <Opportunities />}
      </Container>
    </>
  );
}

export default App;
