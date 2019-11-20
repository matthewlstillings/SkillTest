import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import SearchBar from "./Search";
import InfoBox from './InfoBox';
import pin from "./images/mapPin.png";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { snazzyStyles } from "./MapStyles";

const API_KEY = process.env.REACT_APP_NREL_API_KEY;
const DEFAULT_ZOOM = 8;
const PAGE_SIZE = 200;
const DEFAULT_CENTER = { lat: 47.1, lng: -120.1 };

const getResults = offset =>
  fetch(
    `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=${'h8pP3dk3ZPgI694vYTHSFmgNboSVlXdknQ4hjNep'}&latitude=47.1&longitude=-120.1&state=WA&limit=200&offset=${offset}&radius=220&fuel_type=ELEC`
  );

export default props => {
  const [mapData, setMapData] = useState([]);
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getResults(0)
      .then(res => res.json())
      .then(result => {
        const totalResults = result.total_results;
        for (let i = PAGE_SIZE; i < totalResults; i += PAGE_SIZE) {
          getResults(i)
            .then(res => res.json())
            .then(result => {
              setMapData(data => data.concat(result.fuel_stations));
            });
        }
        setMapData(data => data.concat(result.fuel_stations));
      });
  }, []);

  useEffect(() => {
    if (!address) return;
    let aborted = false;

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        if (aborted) return;
        setZoom(12);
        setCenter({ lat: latLng.lat, lng: latLng.lng });
        setAddress("");
      });

    return () => {
      aborted = false;
    };
  }, [address]);

  return (
    <main className="map_app_main"> 

      <GoogleMap
        id="map"
        mapContainerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        zoom={zoom}
        onZoomChanged={function() {
          setZoom(this.getZoom());
        }}
        center={center}
        options={{
          styles: snazzyStyles
        }}
      >
        {mapData.map(station => {
          return (
            <Marker
              key={station.id}
              position={{
                lat: station.latitude,
                lng: station.longitude
              }}
              //check between mouseenter - mouseover
              onMouseOver={() => {
                const data = station;
                setInfo(data);
              }}
              onMouseOut={() => {
                setInfo(null);
              }}
              cursor={"pointer"}
              title={station.station_name}
              options={{ icon: pin, scaledSize: { width: 2, height: 2 } }}
            />
          );
        })}
        
      </GoogleMap>
      <SearchBar
        address={address}
        setAddress={setAddress}
        setCenter={setCenter}
        setZoom={setZoom}
      />
      {info && (
          <InfoBox info={info} />
      )}
    </main>
  );
};
