import React from "react";
import { InfoBox } from "./styles";

//Information box for extended information about fuel station including: Station name, address, access times. More data on station exists and can be added.
export default props => {
  return (
    <InfoBox className="infobox">
      <p className="infobox_title">{props.info.station_name}</p>
      <p className="infobox_hours">
        Open -
        {props.info.access_days_time
          ? ` ${props.info.access_days_time}`
          : " Unknown"}
      </p>
      <p className="infobox_street">{props.info.street_address}</p>
      <p className="infobox_address">
        {props.info.city}, {props.info.state}, {props.info.zip}
      </p>
      <p
        className="close_info"
        onClick={() => {
          props.setInfo(null);
        }}
      >
        Close
      </p>
    </InfoBox>
  );
};
