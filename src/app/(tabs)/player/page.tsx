"use client";

import React from "react";
import PlayerCard from "@/components/PlayerCard"; // Adjust the import path as necessary

const App = () => {
  const player = {
    name: "Lionel Messi",
    imageUrl: "/players/messi.png", // Updated path to your Messi image
  };

  return (
    <div className=" bg-black">
      <PlayerCard player={player} />
    </div>
  );
};

export default App;
