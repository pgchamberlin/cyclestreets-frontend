import React from "react";
import Downshift from "downshift";
import classNames from "classnames";

import { Option } from "../model/Option";

interface WaypointInputProps {
  index: number;
  value: string;
  onInputChange: { (value: string): any };
  onSelectionChange: { (selection: Option): any}
  options?: Option[];
}

const WaypointInput: React.FunctionComponent<WaypointInputProps> = ({
  onInputChange,
  onSelectionChange,
  options = []
}) => {
  return (
    <Downshift
      itemToString={item => (item ? item.name : "")}
      onInputValueChange={onInputChange}
      onChange={onSelectionChange}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex
      }) => (
        <div className="field is-relative">
          <input
            {...getInputProps({
              className: "input",
              type: "text"
            })}
            onBlur={() => {}}
          />
          <div {...getMenuProps()}>
            {isOpen && options.length > 0 && (
              <div className="dropdown-menu is-block">
                <div className="dropdown-content">
                  {options.map((item, index) => (
                    <a
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        className: classNames("dropdown-item", {
                          "is-active": highlightedIndex === index
                        })
                      })}
                    >
                      {item.name} <small>{item.near}</small>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Downshift>
  );
};

export default WaypointInput;
