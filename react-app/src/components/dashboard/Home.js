import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";

function HomePage() {
  return (
    <div class="page-container">
      <div class="playlist-suggestion">new playlist suggestions</div>
      <div class="greeting">Welcome</div>
      <div class="suggestions">playlist suggestions</div>
      <div class="recently-played">recently played</div>
      <div class="coding-music">coding music</div>
    </div>
  );
}
export default HomePage;
