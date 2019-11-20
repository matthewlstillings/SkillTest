import React, { useState } from "react";
import logo from "./logo.svg";
import ZappyMap from "./components/Map";
import "./App.css";

export default () => {
  return (
    <>
      <div className="App">
        <ZappyMap />
      </div>
    </>
  );
};
