import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { SearchBar } from "./styles";

export default props => {
  const [currentAddress, setCurrentAddress] = useState("");

  return (
    //Search function provided by React Places Autocomplete + Places Google API
    <SearchBar className="search">
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
          <div className="search_inner">
            <div className="search_input_wrapper">
              <input
                {...getInputProps({
                  placeholder: "Find your nearest charging station...",
                  className: "search_input"
                })}
              />
            </div>
            {loading && (
              <div className="search_dropdown visible">
                <div class="search_option">Searching...</div>
              </div>
            )}
            <div
              className={
                "search_dropdown " + (suggestions.length > 0 ? "visible" : "")
              }
            >
              {//Uses React Places to loop through possible suggestions for address based off value from 'currentAddress' state.
              suggestions.map(suggestion => {
                return (
                  <div className="dropdown_suggestion">
                    <span>
                      <p>{suggestion.description}</p>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </SearchBar>
  );
};
