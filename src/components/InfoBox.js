import React from 'react';

const style = {
    position: "absolute",
    top: "0",
    left: "30%",
    background: 'white'
  };

//Information box for extended information about fuel station including: Station name, address, access times. More data on station exists and can be added.  
export default (props) => {
    return (
        <div style={style} className="info_box">
            <p>{props.info.station_name}</p>
            <p>{props.info.street_address}</p>
              <p>
                {props.info.city}, {props.info.state}, {props.info.zip}
              </p>
              <p>Open: {props.info.access_days_time}</p>
        </div>
    )
}

