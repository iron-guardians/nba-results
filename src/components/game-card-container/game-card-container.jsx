import React from "react";

const GameCardContainer = ({ children, className, matchDate }) => {
  return (
    <div
      className={`p-6 rounded-lg w-full ${className}`}
      style={{
        boxShadow:
          "inset 0 4px 8px rgba(0, 0, 0, 0.7), inset 0 -4px 8px rgba(0, 0, 0, 0.7), 0 6px 15px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Fecha seleccionada */}
      {matchDate && (
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
          Games for {matchDate}
        </h2>
      )}

      {/* Contenido del componente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
        {children}
      </div>
    </div>
  );
};

export default GameCardContainer;


