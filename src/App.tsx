import React from "react";

import Pane from "./components/Pane";
import Map from "./containers/Map"

const App: React.FunctionComponent = () => {
  return (
    <>
      <Map />
      <Pane />
    </>
  );
};

export default App;
