import React from "react";

import Pane from "./containers/Pane";
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
