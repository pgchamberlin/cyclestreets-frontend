import React from "react";
import Downshift from "downshift";

interface WaypointInputProps {
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
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {!isOpen
              ? null
              : results.map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.id,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.name} <small>{item.near}</small>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default WaypointInput;
