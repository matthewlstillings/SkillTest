import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

export default props => {
  const [currentAddress, setCurrentAddress] = useState("");
  ////// Remove inline styles
  const style = {
    position: "absolute",
    top: "0",
    left: "50%"
  };
  return (
    //Search function provided by React Places Autocomplete + Places Google API 
    <PlacesAutocomplete
      value={currentAddress}
      onChange={setCurrentAddress}
      onSelect={address => {
        //When Address/Location chosen from 'select' dropdown, the value is passed into "setAddress" state updating the center coordinates of the map
        props.setAddress(address);
        setCurrentAddress(address);
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="search" style={style}>
          <input
            {...getInputProps({
              placeholder: "Find your nearest station",
              className: "search_input"
            })}
          />
          <div className="search_dropdown">
            {loading && <div>Searching...</div>}
            {
              //Uses React Places to loop through possible suggestions for address based off value from 'currentAddress' state. 
              suggestions.map(suggestion => {
              const className = suggestion.active
                ? "dropdown_suggestion--active"
                : "dropdown_suggestion";
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
