import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";

function HomePage() {
  return (
    <div className="page-container">
      <div className="playlist-suggestion">new playlist suggestions</div>
      <div className="greeting">Welcome</div>
      <div className="suggestions">playlist suggestions</div>
      <div className="recently-played">recently played</div>
      <div className="coding-music">coding music</div>
    </div>
  );
}
export default HomePage;
