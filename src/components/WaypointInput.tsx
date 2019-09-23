import React from "react";
import Downshift from "downshift";
import classNames from "classnames";

interface WaypointInputProps {
  index: number;
  value: string;
  onChange: { (value: string): any };
  results?: {
    name: string;
    near: string;
    latitude: number;
    longitude: number;
    id: string;
  }[];
}

const WaypointInput: React.FunctionComponent<WaypointInputProps> = ({
  index,
  onChange,
  results = []
}) => {
  return (
    <Downshift
      itemToString={item => (item ? item.name : "")}
      onInputValueChange={onChange}
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
            {isOpen && results.length > 0 && (
              <div className="dropdown-menu is-block">
                <div className="dropdown-content">
                  {results.map((item, index) => (
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
