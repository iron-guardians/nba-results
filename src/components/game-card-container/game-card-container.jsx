import React from "react";
import GameCard from "../game-card/game-card";

const GameCardContainer = ({ children, className }) => {
  return (
    <div
      className= {`p-6 rounded-lg container mx-auto pt-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 max-w-screen-lg ${className}`}
      style={{
        boxShadow:
          "inset 0 4px 8px rgba(0, 0, 0, 0.7), inset 0 -4px 8px rgba(0, 0, 0, 0.7), 0 6px 15px rgba(0, 0, 0, 0.5)",
      }}
    >
      {children}
    </div>
  );
};

export default GameCardContainer;
