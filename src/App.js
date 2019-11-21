import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import SearchBar from "./components/Search";
import InfoBox from "./components/InfoBox";
import Header from "./components/Header";
import pin from "./components/images/mapPin.png";
import {GlobalStyles} from './GlobalStyles'
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { snazzyStyles } from "./components/MapStyles";
import {Map} from './components/styles';


// Default Variables
//const API_KEY = process.env.REACT_APP_NREL_API_KEY;h8pP3dk3ZPgI694vYTHSFmgNboSVlXdknQ4hjNep
const API_KEY = 'h8pP3dk3ZPgI694vYTHSFmgNboSVlXdknQ4hjNep';
const DEFAULT_ZOOM = 8;
const PAGE_SIZE = 200; // Increment size for data-fetch loop
const DEFAULT_CENTER = { lat: 47.1, lng: -120.1 };

//"offset" is where to start in array to get data from api
//NREL only allows 200 results at a time, so a loop is required to get more than 200 or all at once
const getResults = offset =>
  fetch(
    `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=${API_KEY}&latitude=47.1&longitude=-120.1&state=WA&limit=200&offset=${offset}&radius=220&fuel_type=ELEC`
  );

export default props => {
  const [mapData, setMapData] = useState([]);
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    //Get first 200 results as well as total result number
    getResults(0)
      .then(res => res.json())
      .then(result => {
        const totalResults = result.total_results;
        //Data limited to 200 results per request - Using loop to get the remaining data where results come in 200 at a time until offset is greater than the number of results
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

  //useEffect for getting location data from search input. Uses React Places Autocomplete library.
  useEffect(() => {
    //If second search returned before first, first search will be aborted by setting "aborted" to "true" and exiting the promise, to prevent first location from moving from second search.
    if (!address) return;
    let aborted = false;
    //Promise called to get location coordinates from React Places Autocomplete library, sets 'center' state to update Map Center
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        if (aborted) return;
        setZoom(12);
        setCenter({ lat: latLng.lat, lng: latLng.lng });
        setAddress("");
      });

    return () => {
      aborted = true;
    };
  }, [address]);

  //Map provided using Google Maps API and the 'React-google-maps' library
  return (
    <Map>
      <main className="map_app_main">
        <GlobalStyles />
        <Header />
        <GoogleMap
          id="map"
          zoom={zoom}
          onZoomChanged={function() {
            //Accessing the level of zoom from Google Map, zoom level does not refocus on address search if zoom not bound to state
            setZoom(this.getZoom());
          }}
          center={center}
          options={{
            styles: snazzyStyles,
            fullscreenControl: false,
            mapTypeControl: false
          }}
        >
          {// Looping through NERL fuel station data to retrieve coordinates and rendering markers on map. Markers generated by 'React-google-maps' library
          mapData.map(station => {
            return (
              <Marker
                key={station.id}
                position={{
                  lat: station.latitude,
                  lng: station.longitude
                }}
                //check between mouseenter - mouseover//////////////////////////////////////////////////////
                // Setting Info to data from marker to InfoBox
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
        {//Once info state is set, render infobox to provide extended info about fuel station
        info && <InfoBox setInfo={setInfo} info={info} />}
      </main>
    </Map>
  );
};
