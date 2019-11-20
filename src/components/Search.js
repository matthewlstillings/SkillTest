import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

export default props => {
  const [currentAddress, setCurrentAddress] = useState("");
  //   const handleSelect = address => {
  //     props.setAddress(address);
  //     geocodeByAddress(address)
  //       .then(results => getLatLng(results[0]))
  //       .then(latLng => {
  //         props.setZoom(12);
  //         props.setCenter({ lat: latLng.lat, lng: latLng.lng });
  //       });
  //   };
  const style = {
    position: "absolute",
    top: "0",
    left: "50%"
  };
  return (
    <PlacesAutocomplete
      value={currentAddress}
      onChange={setCurrentAddress}
      onSelect={address => {
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
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
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
