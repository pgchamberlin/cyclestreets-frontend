import React from "react";
import styled from "styled-components";

import PlanForm from '../containers/PlanForm';
import RouteList from '../containers/RouteList';

const StyledPane = styled.div`
  width: 400px;
  height: 100%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  padding: 10px;
  position: absolute;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
`;

const Pane: React.FunctionComponent = () => {
  return (
    <StyledPane>
      <div className="content">
        <h1 className="title">Cycle Maps</h1>
      </div>
      <PlanForm />
      <RouteList />
    </StyledPane>
  );
};

export default Pane;
